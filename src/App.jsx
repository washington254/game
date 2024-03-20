import {
  MeshNormalMaterial,
  TorusKnotGeometry,
} from 'three'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, useGLTF } from '@react-three/drei'
import {
  Debug,
  Physics,
  useBox,
  usePlane,
  useSphere,
  useTrimesh,
  useCylinder,
  useConvexPolyhedron,
} from '@react-three/cannon'
import { useMemo, useRef } from 'react'
import { Model } from './Model'



function Plane(props) {
  const [ref] = usePlane(() => ({ mass: 0, ...props }), useRef())
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial />
    </mesh>
  )
}

function Box(props) {
  const [ref, api] = useBox(
    () => ({ args: [1, 1, 1], mass: 1, ...props }),
    useRef()
  )

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  )
}

function Sphere(props) {
  const [ref, api] = useSphere(
    () => ({ args: [0.75], mass: 1, ...props }),
    useRef()
  )

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <sphereGeometry args={[0.75]} />
      <meshNormalMaterial />
    </mesh>
  )
}

function Cylinder(props) {
  const [ref, api] = useCylinder(
    () => ({ args: [1, 1, 2, 8], mass: 1, ...props }),
    useRef()
  )

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <cylinderGeometry args={[1, 1, 2, 8]} />
      <meshNormalMaterial />
    </mesh>
  )
}



function TorusKnot(props) {
  const geometry = useMemo(() => new TorusKnotGeometry(), [])
  const [ref, api] = useTrimesh(
    () => ({
      args: [geometry.attributes.position.array, geometry.index.array],
      mass: 1,
      ...props,
    }),
    useRef()
  )

  return (
    <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
      <torusKnotGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

function Monkey(props) {
  const { nodes } = useGLTF('/hamburger.glb')
  console.log(nodes);
  const [ref, api] = useTrimesh(
    () => ({
      args: [
        nodes.Suzanne.geometry.attributes.position.array,
        nodes.Suzanne.geometry.index.array,
      ],
      mass: 1,
      ...props,
    }),
    useRef()
  )
  return (
    <group
      ref={ref}
      {...props}
      dispose={null}
      onPointerDown={() => api.velocity.set(0, 5, 0)}
    >
      <mesh
        castShadow
        geometry={nodes.Suzanne.geometry}
        material={useMemo(() => new MeshNormalMaterial(), [])}
      />
    </group>
  )
}

function App() {
  
  return (
    <Canvas shadows camera={{ position: [0, 2, 14] }}>
      <ambientLight intensity={2}/>
      <spotLight
        position={[2.5, 5, 5]}
        angle={Math.PI / 4}
        penumbra={0.5}
        castShadow
        intensity={Math.PI * 25}
      />
      <spotLight
        position={[-2.5, 5, 5]}
        angle={Math.PI / 4}
        penumbra={0.5}
        castShadow
        intensity={Math.PI * 25}
      />
      <Physics >
        <Debug color={"red"}  >
          <Plane rotation={[-Math.PI / 2, 0, 0]} />
          <Model   position={[-2, 20, 0]}   />
          </Debug>
      </Physics>
      <OrbitControls target-y={0.5} />
      <Stats />
    </Canvas>
  )
}

export default App;