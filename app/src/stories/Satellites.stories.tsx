import { Planets, SatelliteTrack, Satellites, Ship } from '../3d'
import React, { Suspense } from 'react'
import { boolean, number, withKnobs } from '@storybook/addon-knobs'

import { FlyControls } from 'drei'
import { Setup } from '../Setup'

export function SatellitesStory() {
  const includePlanets = boolean('IncludePlanets', true)
  const axisHelper = boolean('AxisHelper', true)

  return (
    <>
      <FlyControls
        autoForward={boolean('AutoForward', false)}
        dragToLook={boolean('DragToLook', false)}
        movementSpeed={number('MovementSpeed', 300.0)}
        rollSpeed={number('RollSpeed', 0.4)}
      />
      <Suspense fallback={null}>
        <Ship initialPosition={[0, 1000, 0]} />
        {includePlanets ? <Planets /> : null}
        <Satellites />
      </Suspense>
      {axisHelper && <axesHelper />}
    </>
  )
}

SatellitesStory.storyName = 'Satellites'

export default {
  title: 'UI/Satellites',
  component: Satellites,
  decorators: [
    withKnobs,
    (storyFn: Function) => (
      // red, green, blue (use axesHelper to help adjust)
      <Setup cameraPosition={[0, 0, 10]} controls={false}>
        {storyFn()}
      </Setup>
    ),
  ],
}
