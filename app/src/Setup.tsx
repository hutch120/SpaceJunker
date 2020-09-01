import * as THREE from 'three'

import { Canvas } from 'react-three-fiber'
import { OrbitControls } from 'drei'
import React from 'react'
import styled from 'styled-components'

export function Setup({
  children,
  cameraPosition = [-5, 5, 5],
  far = 20000,
  fov = 70,
  backgroundColor = '#020209',
  controls = true,
}: {
  children: any
  cameraPosition?: any
  backgroundColor?: string
  controls?: boolean
  far?: number
  fov?: number
}) {
  return (
    <Container>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: cameraPosition, far, fov }}
        pixelRatio={window.devicePixelRatio}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(new THREE.Color(backgroundColor))
        }}
      >
        {children}
        <ambientLight intensity={0.1} />
        <pointLight intensity={1} position={[0, 6, 0]} />
        {controls && <OrbitControls />}
      </Canvas>
    </Container>
  )
}

const Container = styled.div`
  height: 500px;
  width: 100%;
`
