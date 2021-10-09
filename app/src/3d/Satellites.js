import * as THREE from 'three'

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
    <group ref={ref} position={new THREE.Vector3(0, 0, 0)} scale={[scale, scale, scale]}>
      <object3D
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[100, 100, 100]}>
        {gltf.__$.map((node, index) => GetMesh(node, index))}
      </object3D>
    </group>
  )
}

Satellite.propTypes = {
  gltf: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
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
