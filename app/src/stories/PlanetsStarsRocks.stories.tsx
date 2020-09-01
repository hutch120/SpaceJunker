import { Planets, Rocks } from '../3d'
import React, { Suspense } from 'react'
import { boolean, number, withKnobs } from '@storybook/addon-knobs'

import { FlyControls } from 'drei'
import { Setup } from '../Setup'
import { Stars } from 'drei'

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
      <FlyControls
        autoForward={boolean('AutoForward', false)}
        dragToLook={boolean('DragToLook', false)}
        movementSpeed={number('MovementSpeed', 500.0)}
        rollSpeed={number('RollSpeed', 0.4)}
      />
      <Suspense fallback={null}>
        <Planets />
        <Stars radius={3000} depth={500} />
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
      <Setup cameraPosition={[700, -1500, 3000]} controls={false}>
        {storyFn()}
      </Setup>
    ),
  ],
}
