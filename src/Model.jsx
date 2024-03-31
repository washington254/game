import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useTrimesh } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber'; 











export function Model(props) {
  const { nodes, materials } = useGLTF('/plane.glb')

  const [ref, api] = useTrimesh(() => ({
    args: [
      nodes['0_0'].geometry.attributes.position.array,
      nodes['0_0'].geometry.index.array,
    ],
    mass: 1,
    ...props,
  }), useRef());


  const helixRef = useRef();

  
  useFrame(() => {
      helixRef.current.rotation.y -= 1.0; 
  });


  return (
    <group {...props} dispose={null}>
      <group rotation={[-1.812, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['0_0'].geometry}
          material={materials['ki100_co.paa__ki100.rvmat']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['0_1'].geometry}
          material={materials['glass.paa__glass.rvmat']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/plane.glb')