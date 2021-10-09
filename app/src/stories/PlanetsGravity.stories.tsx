import React, { Suspense } from 'react'

import { PlanetsGravity } from '../3d'
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
export function PlanetsGravityStory() {
  return (
    <>
      <Suspense fallback={null}>
        <PlanetsGravity />
      </Suspense>
    </>
  )
}

PlanetsGravityStory.storyName = 'PlanetsGravity'

export default {
  title: 'UI/Gravity',
  component: PlanetsGravity,
  decorators: [
    withKnobs,
    (storyFn: Function) => (
      <Setup cameraPosition={[5, 5, 50]}>{storyFn()}</Setup>
    ),
  ],
}
