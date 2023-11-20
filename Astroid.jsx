/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/cloud/astroid.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/astroid.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Asteroids_Mesh.geometry} material={materials['Asteroids_Mat.001']} position={[0, -1.441, 0]} scale={0.266} />
    </group>
  )
}

useGLTF.preload('/astroid.glb')
