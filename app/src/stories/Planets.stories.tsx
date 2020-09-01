import React, { Suspense } from 'react'

import { Planets } from '../3d'
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
export function PlanetsStory() {
  return (
    <>
      <Suspense fallback={null}>
        <Planets />
      </Suspense>
    </>
  )
}

PlanetsStory.storyName = 'Planets'

export default {
  title: 'UI/Planets',
  component: Planets,
  decorators: [
    withKnobs,
    (storyFn: Function) => (
      <Setup cameraPosition={[700, -1500, 3000]}>{storyFn()}</Setup>
    ),
  ],
}
