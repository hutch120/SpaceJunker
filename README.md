Space Junker Game


# Deployed with gh-pages

- yarn add gh-pages --dev
- Set homepage in package.json
- Add this to package scripts: `"deploy": "yarn build && gh-pages -b gh-deploy -d build"`
- Run `yarn deploy`
- Go to github settings -> pages and set the pages to gh-pages branch
