@echo off

@call yarn build

@echo Deploy website to S3
aws --profile simonhutchison s3 sync "%~dp0.\build" s3://spacejunker.hutchisonsoftware.com.au --delete --exclude "*.map" --acl public-read

@echo Clear Cloudfront cache - can take up to 5 minutes.
@echo Cache for spacejunker.hutchisonsoftware.com.au
aws --profile simonhutchison cloudfront create-invalidation --distribution-id E2H6HTHIIA9FBK --paths /*
