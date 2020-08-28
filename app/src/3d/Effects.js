import React, { useEffect, useRef } from 'react'
import { extend, useFrame, useThree } from 'react-three-fiber'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass })

export default function Effects () {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  useEffect(() => composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 2)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[undefined, 1.8, 1, 0]} />
    </effectComposer>
  )
}
