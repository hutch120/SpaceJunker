import * as THREE from 'three'

import { Planets, Rocks } from './3d'
import React, { Suspense } from 'react'

import { Box } from './shapes'
import { Canvas } from 'react-three-fiber'
import Effects from './3d/Effects'
import { FlyControls } from 'drei'
import Hud from './Hud'
import UserInput from './store/UserInput'
import useStore from './store/Store'

// import Rig from './3d/Rig'
// import Ship from './3d/Ship'

// import Enemies from './3d/Enemies'

/* import Explosions from './3d/Explosions'
import Particles from './3d/Particles'
import Rings from './3d/Rings'
import Stars from './3d/Stars'
import Track from './3d/Track' */

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
          gl.setClearColor(new THREE.Color('#020209'))
        }}
        invalidateFrameloop
      >
        <fog attach="fog" args={['#070710', 100, 700]} />
        <ambientLight intensity={0.5} />
        <FlyControls
          autoForward={false}
          dragToLook={false}
          movementSpeed={1.0}
          rollSpeed={0.005}
        />
        {/* <Stars />
        <Explosions />
         <Track />
        <Particles />
        <Rings />
        */}
        <Box>
          <meshBasicMaterial attach="material" wireframe />
        </Box>

        <Suspense fallback={null}>
          <Rocks />
          <Planets />
          {/* <Enemies />
          <Rig>
            <Ship />
          </Rig>
          */}
        </Suspense>
        <Effects />
      </Canvas>
      <Hud />
    </>
  )
}
