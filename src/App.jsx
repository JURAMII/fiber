import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Fiber from './component/fiber'

function App() {

  return (
    <>
      <Canvas
      shadows
      camera={{position:[3,3,3]}}
      >
        <OrbitControls/>
        <axesHelper args={[10]}/>
        <gridHelper args={[10, 10]}/>
        <Fiber />
      </Canvas>
    </>
  )
}

export default App
