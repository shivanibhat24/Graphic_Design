"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshTransmissionMaterial } from "@react-three/drei"
import { useRef, useState } from "react"
import * as THREE from "three"

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const mouse = useRef(new THREE.Vector2())

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    
    // Smoothly follow mouse
    mouse.current.lerp(new THREE.Vector2(state.mouse.x, state.mouse.y), 0.1)
    
    meshRef.current.rotation.x = time * 0.2 + mouse.current.y * 0.5
    meshRef.current.rotation.y = time * 0.3 + mouse.current.x * 0.5
    
    // Subtle breathing scale
    const s = 1.5 + Math.sin(time) * 0.05
    meshRef.current.scale.set(s, s, s)
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#5e17eb" intensity={500} />
      <pointLight position={[5, 5, 5]} color="#ff3e00" intensity={500} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere 
          ref={meshRef} 
          args={[1, 100, 100]} 
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={0.1}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.5}
            temporalDistortion={0.5}
            clearcoat={0.5}
            attenuationDistance={1}
            attenuationColor="#ffffff"
            color="white"
          />
        </Sphere>
      </Float>

    </>
  )
}

export default function ThreeScene() {
  return (
    <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }} 
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, stencil: false, depth: true }}
        style={{ pointerEvents: "none" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
