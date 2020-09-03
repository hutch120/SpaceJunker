import React from 'react'
import { SatellitesCloud } from '../3d'
import { Setup } from '../Setup'
import { withKnobs } from '@storybook/addon-knobs'

/*
radius?: number;
depth?: number;
count?: number;
factor?: number;
saturation?: number;
fade?: boolean;
*/
export function SatellitesCloudStory() {
  return (
    <>
      <axesHelper />
      <SatellitesCloud radius={1000} />
    </>
  )
}

SatellitesCloudStory.storyName = 'SatellitesCloud'

export default {
  title: 'UI/SatellitesCloud',
  component: SatellitesCloud,
  decorators: [withKnobs, (storyFn: Function) => <Setup>{storyFn()}</Setup>],
}
