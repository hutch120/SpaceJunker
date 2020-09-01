import { Planets, Rocks } from '../3d'
import React, { Suspense } from 'react'
import { boolean, number, withKnobs } from '@storybook/addon-knobs'

import { Setup } from '../Setup'

export function RocksStory() {
  const includePlanets = boolean('IncludePlanets', true)
  const axisHelper = boolean('AxisHelper', true)

  return (
    <>
      <Suspense fallback={null}>
        {includePlanets ? <Planets /> : null}
        <Rocks />
      </Suspense>
      {axisHelper && <axesHelper />}
    </>
  )
}

RocksStory.storyName = 'Rocks'

export default {
  title: 'UI/Rocks',
  component: Rocks,
  decorators: [
    withKnobs,
    (storyFn: Function) => (
      // red, green, blue (use axesHelper to help adjust)
      <Setup cameraPosition={[5, 4, -7]}>{storyFn()}</Setup>
    ),
  ],
}
