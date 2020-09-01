import Avatar, { AvatarStyle } from 'avataaars'

import React from 'react'

export function AvatarStory() {
  return (
    <>
      <Avatar
        style={{ width: '100px', height: '100px' }}
        avatarStyle="Circle"
        topType="LongHairMiaWallace"
        accessoriesType="Prescription02"
        hairColor="BrownDark"
        facialHairType="Blank"
        clotheType="Hoodie"
        clotheColor="PastelBlue"
        eyeType="Happy"
        eyebrowType="Default"
        mouthType="Smile"
        skinColor="Light"
      />

      <Avatar
        style={{ width: '100px', height: '100px' }}
        avatarStyle="Circle"
        topType="ShortHairShortFlat"
        accessoriesType="Wayfarers"
        hairColor="Blonde"
        facialHairType="Blank"
        clotheType="BlazerShirt"
        eyeType="Default"
        eyebrowType="Default"
        mouthType="Default"
        skinColor="Light"
      />

      <Avatar
        style={{ width: '100px', height: '100px' }}
        avatarStyle="Circle"
        topType="LongHairStraight"
        accessoriesType="Blank"
        hairColor="BrownDark"
        facialHairType="Blank"
        clotheType="BlazerShirt"
        eyeType="Default"
        eyebrowType="Default"
        mouthType="Default"
        skinColor="Brown"
      />
      <Avatar
        style={{ width: '100px', height: '100px' }}
        avatarStyle="Circle"
        topType="ShortHairFrizzle"
        accessoriesType="Prescription02"
        hairColor="Black"
        facialHairType="Blank"
        clotheType="Hoodie"
        clotheColor="Gray02"
        eyeType="Happy"
        eyebrowType="Angry"
        mouthType="Smile"
        skinColor="Black"
      />
    </>
  )
}

AvatarStory.storyName = 'BoysAndGirls'

export default {
  title: 'Avatar/Examples',
  component: Avatar,
}
