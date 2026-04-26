'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function CoffeeBean({ position, rotation, speed, scale }: {
  position: [number, number, number]
  rotation: [number, number, number]
  speed: number
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position])
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * speed + offset
    meshRef.current.position.x = initialPos.x + Math.sin(t * 0.5) * 0.3
    meshRef.current.position.y = initialPos.y + Math.sin(t * 0.7) * 0.4
    meshRef.current.position.z = initialPos.z + Math.cos(t * 0.3) * 0.2
    meshRef.current.rotation.x += 0.003
    meshRef.current.rotation.y += 0.005
    meshRef.current.rotation.z += 0.002
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Coffee bean shape: scaled sphere with a crease */}
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color="#6B4C33"
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  )
}

function CoffeeBeanGroup() {
  const beans = useMemo(() => {
    const items = []
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2
      const radius = 2 + Math.random() * 2.5
      items.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * radius - 2,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        speed: 0.2 + Math.random() * 0.3,
        scale: 0.15 + Math.random() * 0.15,
      })
    }
    return items
  }, [])

  return (
    <>
      {beans.map((bean, i) => (
        <CoffeeBean key={i} {...bean} />
      ))}
    </>
  )
}

export default function CoffeeBeans3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#D4A574" />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#E8C547" />
      <CoffeeBeanGroup />
    </Canvas>
  )
}
