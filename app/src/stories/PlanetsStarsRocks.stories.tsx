import { Planets, Rocks, Stars } from '../3d'
import React, { Suspense } from 'react'

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
export function PlanetsStarRocksStory() {
  return (
    <>
      <Suspense fallback={null}>
        <Planets />
        <Stars />
        <Rocks />
      </Suspense>
    </>
  )
}

PlanetsStarRocksStory.storyName = 'PlanetsStarsRocks'

export default {
  title: 'UI/PlanetsStarsRocks',
  component: PlanetsStarRocksStory,
  decorators: [
    withKnobs,
    (storyFn: Function) => (
      <Setup cameraPosition={[700, -1500, 3000]}>{storyFn()}</Setup>
    ),
  ],
}
