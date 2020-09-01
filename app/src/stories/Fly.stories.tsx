import { boolean, number, withKnobs } from '@storybook/addon-knobs'

import { Box } from '../shapes'
import { FlyControls } from 'drei'
import React from 'react'
import { Setup } from '../Setup'

export function FlyControlsStory() {
  return (
    <>
      <FlyControls
        autoForward={boolean('AutoForward', false)}
        dragToLook={boolean('DragToLook', false)}
        movementSpeed={number('MovementSpeed', 2.0)}
        rollSpeed={number('RollSpeed', 0.4)}
      />
      <Box>
        <meshBasicMaterial attach="material" wireframe />
      </Box>
    </>
  )
}

FlyControlsStory.storyName = 'Fly'

export default {
  title: 'Controls/FlyControls',
  component: FlyControls,
  decorators: [
    withKnobs,
    (storyFn: Function) => <Setup controls={false}>{storyFn()}</Setup>,
  ],
}
