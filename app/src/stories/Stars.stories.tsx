import React from 'react'
import { Setup } from '../Setup'
import { Stars } from 'drei'
import { withKnobs } from '@storybook/addon-knobs'

/*
radius?: number;
depth?: number;
count?: number;
factor?: number;
saturation?: number;
fade?: boolean;
*/
export function StarsStory() {
  return (
    <>
      <axesHelper />
      <Stars radius={1000} />
    </>
  )
}

StarsStory.storyName = 'Stars'

export default {
  title: 'UI/Stars',
  component: Stars,
  decorators: [withKnobs, (storyFn: Function) => <Setup>{storyFn()}</Setup>],
}
