import * as THREE from 'three'

import { Physics, useSphere } from 'use-cannon'
import React, { useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'

import earthImg from '../images/earth.jpg'
import moonImg from '../images/moon.png'

function useTurntable (ref, speed) {
  useFrame(() => {
    if (ref && ref.current) {
      ref.current.rotation.y += speed
    }
  })
}

export function Planets () {
  // const [earthRefPhysics] = useSphere(() => ({ mass: 1, args: 0.5, position: [0, 5, 0] }))
  const earthRef = useRef()
  useTurntable(earthRef, 0.001)
  const moonRef = useRef()
  useTurntable(moonRef, 0.001)
  const sunRef = useRef()

  const [texture, moon] = useLoader(THREE.TextureLoader, [earthImg, moonImg])
  return (
    <Physics>
      <group scale={[100, 100, 100]} position={[0, 0, 0]}>
        <mesh ref={earthRef}>
          <sphereBufferGeometry attach="geometry" args={[5, 32, 32]} />
          <meshStandardMaterial attach="material" map={texture} roughness={1} fog={false} />
        </mesh>
        <mesh ref={moonRef} position={[5, -5, -5]}>
          <sphereBufferGeometry attach="geometry" args={[0.75, 32, 32]} />
          <meshStandardMaterial attach="material" roughness={1} map={moon} fog={false} />
        </mesh>
        <pointLight position={[-5, -5, -5]} distance={1000} intensity={6} />
        <mesh ref={sunRef} position={[-30, -10, -60]}>
          <sphereBufferGeometry attach="geometry" args={[4, 32, 32]} />
          <meshBasicMaterial attach="material" color="#FFFF99" fog={false} />
          <pointLight distance={6100} intensity={50} color="white" />
        </mesh>
      </group>
    </Physics>
  )
}
