import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

export function SatellitesCloud ({ count = 2000, radius = 4000 }) {
  const positions = useMemo(() => {
    const positions = []
    for (let i = 0; i < count; i++) {
      const r = radius
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.cos(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
      const y = r * Math.sin(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
      const z = r * Math.cos(phi) + (-1000 + Math.random() * 2000)
      positions.push(x)
      positions.push(y)
      positions.push(z)
    }
    return new Float32Array(positions)
  }, [count])
  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute attachObject={['attributes', 'position']} count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial attach="material" size={15} sizeAttenuation color="white" fog={false} />
    </points>
  )
}

SatellitesCloud.propTypes = {
  count: PropTypes.number,
  radius: PropTypes.number
}
