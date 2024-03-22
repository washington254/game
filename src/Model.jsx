import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useTrimesh } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber'; 











export function Model(props) {
  const { nodes, materials } = useGLTF('/airplane.glb');
  const [ref, api] = useTrimesh(() => ({
    args: [
      nodes.supports.geometry.attributes.position.array,
      nodes.supports.geometry.index.array,
    ],
    mass: 1,
    ...props,
  }), useRef());


  const helixRef = useRef();

  
  useFrame(() => {
      helixRef.current.rotation.z -= 1.0; 
  });



  return (
    <group
      ref={ref}
      {...props}
      dispose={null}
      onPointerDown={() => api.velocity.set(0, 0, 5)}
    >
      <mesh geometry={nodes.supports.geometry} material={materials['Material.004']} />
      <mesh geometry={nodes.chassis.geometry} material={materials['Material.005']} />
      <mesh position={[0,.5,0]} geometry={nodes.helix.geometry} material={materials['Material.005']} ref={helixRef} />
    </group>
  );
}

useGLTF.preload('/airplane.glb');