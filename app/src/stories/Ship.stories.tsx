import React, { Suspense } from 'react'

import { Setup } from '../Setup'
import { Ship } from '../3d'
import { withKnobs } from '@storybook/addon-knobs'

export function ShipStory() {
  return (
    <>
      <axesHelper />
      <Suspense fallback={null}>
        <Ship />
      </Suspense>
    </>
  )
}

ShipStory.storyName = 'Ship'

export default {
  title: 'UI/Ship',
  component: Ship,
  decorators: [
    withKnobs,
    (storyFn: Function) => (
      <Setup cameraPosition={[40, 30, 50]}>{storyFn()}</Setup>
    ),
  ],
}
