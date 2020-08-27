import * as THREE from 'three'

import React, { Suspense } from 'react'

import { Canvas } from 'react-three-fiber'
import Effects from './3d/Effects'
import Enemies from './3d/Enemies'
import Explosions from './3d/Explosions'
import Hud from './Hud'
import Particles from './3d/Particles'
import Planets from './3d/Planets'
import Rig from './3d/Rig'
import Rings from './3d/Rings'
import Rocks from './3d/Rocks'
import Ship from './3d/Ship'
import Stars from './3d/Stars'
import Track from './3d/Track'
import useStore from './store'

export default function App () {
  const { fov } = useStore((state) => state.mutation)
  const actions = useStore((state) => state.actions)
  return (
    <>
      <Canvas
        concurrent
        gl={{ antialias: false }}
        onPointerMove={actions.updateMouse}
        onClick={actions.shoot}
        camera={{ position: [0, 0, 2000], near: 0.01, far: 10000, fov }}
        onCreated={({ gl, camera }) => {
          actions.init(camera)
          gl.gammaInput = true
          gl.toneMapping = THREE.Uncharted2ToneMapping
          gl.setClearColor(new THREE.Color('#020209'))
        }}
      >
        <fog attach="fog" args={['#070710', 100, 700]} />
        <ambientLight intensity={0.25} />
        <Stars />
        <Explosions />
        <Track />
        <Particles />
        <Rings />
        <Suspense fallback={null}>
          <Rocks />
          <Planets />
          <Enemies />
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