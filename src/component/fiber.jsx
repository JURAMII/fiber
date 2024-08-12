import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react"
import * as THREE from 'three'

export default function Fiber() {

    const firstRef = useRef();
    const groupRef = useRef();

    useEffect(() => {
        const group = groupRef.current;
        for (let i = 0; i < group.children.length; i++) {
            const mesh = group.children[i]
            mesh.geometry = firstRef.current.geometry
            mesh.position.x = i % (group.children.length / 2) * 2 - 4
            mesh.position.z = -1;
            if (i >= group.children.length / 2) {
                mesh.position.z = 1;
            }
        }
    })

    const matcap = useTexture('t1.jpg')
    const matcap2 = useTexture('t2.jpg')

    return (
        <>
            <directionalLight />
            {/* 바닥 */}
            <mesh
                rotation-x={[THREE.MathUtils.degToRad(90)]}
                position-y={-0.9}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color={"#333"} side={THREE.DoubleSide} />
            </mesh>

            <mesh ref={firstRef}>
                <torusKnotGeometry args={[0.5, 0.2]} />
                <meshStandardMaterial />
            </mesh>

            <group ref={groupRef}>
                <mesh><meshBasicMaterial color='green' wireframe /></mesh>
                <mesh><meshBasicMaterial color='red' /></mesh>
                <mesh>
                    <meshLambertMaterial color='red' emissive={'blue'} />
                    {/* emissive 빛이 반사되지 않는 쪽 색깔 */}
                </mesh>
                <mesh>
                    <meshPhongMaterial
                        color='red'
                        emissive={'black'}
                        specular={'#fff'}
                        shininess={40} //광
                        flatShading={true} />
                </mesh>
                <mesh><meshNormalMaterial /></mesh>
                <mesh>
                    <meshStandardMaterial
                        color='orangeRed'
                        roughness={0}
                    />
                </mesh>
                <mesh>
                    <meshPhysicalMaterial
                        color={'#fff'}
                        emissive={'black'}
                        transparent={true}
                        transmission={1}
                        thickness={0}
                        ior={2.33}
                        roughness={0}
                        metalness={0}
                        clearcoat={0}
                        clearcoatRoughness={0} />
                </mesh>
                <mesh><meshStandardMaterial color={'black'} /></mesh>
                <mesh><meshMatcapMaterial flatShading={true} matcap={matcap} /></mesh>
                <mesh><meshMatcapMaterial matcap={matcap2}/></mesh>
            </group>
        </>
    )
}