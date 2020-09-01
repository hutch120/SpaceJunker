import React, { Suspense } from 'react'
import { boolean, number, withKnobs } from '@storybook/addon-knobs'

import { FlyControls } from 'drei'
import { Planets } from '../3d'
import { Setup } from '../Setup'

export function FlyPlanetStory() {
  return (
    <>
      <axesHelper />
      <FlyControls
        autoForward={boolean('AutoForward', false)}
        dragToLook={boolean('DragToLook', false)}
        movementSpeed={number('MovementSpeed', 500.0)}
        rollSpeed={number('RollSpeed', 0.4)}
      />
      <Suspense fallback={null}>
        <Planets />
      </Suspense>
    </>
  )
}

FlyPlanetStory.storyName = 'FlyPlanet'

export default {
  title: 'Controls/FlyPlanet',
  component: FlyControls,
  decorators: [
    withKnobs,
    (storyFn: Function) => (
      <Setup cameraPosition={[-100, -1500, 3000]} controls={false}>
        {storyFn()}
      </Setup>
    ),
  ],
}
