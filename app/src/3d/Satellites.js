import React, { useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import PropTypes from 'prop-types'
import useStore from '../store/Store'

export function Satellites () {
  const gltf = useLoader(GLTFLoader, '3d/satellite2cc/scene.gltf')
  const satellites = useStore(state => state.satellites)
  return satellites.map(data => <SatelliteMemo gltf={gltf} key={data.guid} data={data} />)
}

const SatelliteMemo = React.memo(Satellite)
function Satellite ({ gltf, data }) {
  const ref = useRef()
  const { clock } = useStore(state => state.mutation)
  useFrame(() => {
    const r = Math.cos((clock.getElapsedTime() / 2) * data.speed) * Math.PI
    ref.current.rotation.set(r, r, r)
  })

  const scale = 0.5
  return (
    <group ref={ref} position={data.offset} scale={[scale, scale, scale]}>
      <object3D
        position={[-0.016298329457640648, -0.012838120572268963, 0.24073271453380585]}
        rotation={[3.0093872578726644, 0.27444228385461117, -0.22745113653772078]}
        scale={[20, 20, 20]}>
        {gltf.__$.map((node, index) => GetMesh(node, index))}
      </object3D>
    </group>
  )
}

function GetMesh (node, index) {
  if (!node.visible) {
    return null
  }
  return <mesh key={index}>
    <bufferGeometry attach="geometry" {...node.geometry} />
    <meshStandardMaterial attach="material" {...node.material} color="white" roughness={1} metalness={1} />
  </mesh>
}
