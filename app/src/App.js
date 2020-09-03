import * as THREE from 'three'

import { Planets, Rig, Rocks, Ship, Stars } from './3d'
import React, { Suspense } from 'react'

import { Box } from './shapes'
import { Canvas } from 'react-three-fiber'
import Effects from './3d/Effects'
import Enemies from './3d/Enemies'
import Explosions from './3d/Explosions'
import { FlyControls } from 'drei'
import Hud from './Hud'
import Particles from './3d/Particles'
import Rings from './3d/Rings'
import Track from './3d/Track'
import UserInput from './store/UserInput'
import useStore from './store/Store'

export default function App () {
  const { fov } = useStore((state) => state.mutation)
  const actions = useStore((state) => state.actions)

  return (
    <>
      <UserInput />
      <Canvas
        concurrent
        gl={{ antialias: false }}
        onPointerMove={actions.updateMouse}
        onClick={actions.shoot}
        camera={{ position: [0, 0, 2000], near: 0.01, far: 10000, fov }}
        onCreated={({ gl, camera }) => {
          actions.init(gl, camera)
          gl.gammaInput = true
          // gl.toneMapping = THREE.Uncharted2ToneMapping
          gl.setClearColor(new THREE.Color('black'))
        }}
        invalidateFrameloop
      >

        <ambientLight intensity={0.8} />
        <FlyControls
          autoForward={false}
          dragToLook={false}
          movementSpeed={1.0}
          rollSpeed={0.005}
        />

        <Suspense fallback={null}>

          <Rig>
            <Ship />
          </Rig>

        </Suspense>
        <Effects />
      </Canvas>
      <Hud />
    </>
  )
}
