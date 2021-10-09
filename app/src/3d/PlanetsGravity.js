import * as THREE from 'three'

import { Physics, useBox, usePlane, useSphere } from 'use-cannon'
import React, { useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'

import earthImg from '../images/earth.jpg'
import moonImg from '../images/moon.png'

/*
function useTurntable (ref, speed) {
  useFrame(() => {
    if (ref && ref.current) {
      ref.current.rotation.y += speed
    }
  })
} */

function Plane (props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
    </mesh>
  )
}

function Cube (props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
    </mesh>
  )
}

function Sphere (props) {
  const { texture, position, mass, velocity, radius } = props
  const [ref] = useSphere(() => ({ mass, position, velocity }))
  return (
    <mesh ref={ref}>
      <sphereBufferGeometry attach="geometry" args={[radius, 32, 32]} />
      <meshStandardMaterial attach="material" map={texture} roughness={1} fog={false} />
    </mesh>
  )
}

export function PlanetsGravity () {
  // const [earthRefPhysics] = useSphere(() => ({ mass: 1, args: 0.5, position: [0, 5, 0] }))
  /* const earthRef = useRef()
  useTurntable(earthRef, 0.001)
  const moonRef = useRef()
  useTurntable(moonRef, 0.001)
  const sunRef = useRef() */

  /*
  const [earthRef] = useSphere(() => ({ mass: 10, rotation: [-Math.PI / 2, 0, 0], velocity: 10 }))
  const [moonRef] = useSphere(() => ({ mass: 1, rotation: [-Math.PI / 2, 0, 0], velocity: 20 }))
  const [sunRef] = useSphere(() => ({ mass: 100, rotation: [-Math.PI / 2, 0, 0], velocity: 0 }))
  */
  const [earthTexture, moonTexture] = useLoader(THREE.TextureLoader, [earthImg, moonImg])

  return (
    <Physics>
      <Sphere key={1} radius={10} position={[0, 0, 0]} texture={earthTexture} mass={0} velocity={0}/>
      <Sphere key={2} radius={2} position={[20, 0, 0]} texture={moonTexture} mass={0} velocity={[0, 0, 8]}/>

      {/* }
      <group scale={[100, 100, 100]} position={[0, 0, 0]}>
        <mesh ref={earthRef} position={[0, 0, 0]}>
          <sphereBufferGeometry attach="geometry" args={[5, 32, 32]} />
          <meshStandardMaterial attach="material" map={texture} roughness={1} fog={false} />
        </mesh>
        <mesh ref={moonRef} position={[5, -5, -5]}>
          <sphereBufferGeometry attach="geometry" args={[0.75, 32, 32]} />
          <meshStandardMaterial attach="material" roughness={1} map={moonTexture} fog={false} />
        </mesh>
        <pointLight position={[-5, -5, -5]} distance={1000} intensity={6} />
        <mesh ref={sunRef} position={[-30, -10, -60]}>
          <sphereBufferGeometry attach="geometry" args={[4, 32, 32]} />
          <meshBasicMaterial attach="material" color="#FFFF99" fog={false} />
          <pointLight distance={6100} intensity={50} color="white" />
        </mesh>
  </group> */}
    </Physics>
  )
}
