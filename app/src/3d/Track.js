import React from 'react'
import useStore from '../store/Store'

export function Track () {
  const { scale, track } = useStore(state => state.mutation)
  return (
    <mesh scale={[scale, scale, scale]} geometry={track}>
      <meshBasicMaterial attach="material" color="indianred" />
    </mesh>
  )
}

export function SatelliteTrack () {
  const { scale, satelliteTrack } = useStore(state => state.mutation)
  return (
    <mesh scale={[scale, scale, scale]} geometry={satelliteTrack}>
      <meshBasicMaterial attach="material" color="indianred" />
    </mesh>
  )
}
