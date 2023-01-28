import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';
import { OrthographicCamera} from "@react-three/drei";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.extend({ OrbitControls });
extend({ OrbitControls });

const CameraControls = () => {
    const {
        camera,
        gl: { domElement },
    } = useThree();
    const controls = useRef();
    useFrame((state) => controls.current.update());
    return (
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            enableZoom={true}
            // maxAzimuthAngle={Math.PI / 4}
            // maxPolarAngle={Math.PI}
            // minAzimuthAngle={-Math.PI / 4}
            // minPolarAngle={0}
            enablePan={true}
  enableRotate={true}
  reverseOrbit={false}
        />
    );
};

const CanvasContainer = ({ meshObjects }) => {
    console.log(meshObjects);
    const orthoCameraProps = { position: [0,0, 1000], zoom:1};
    // console.log(meshObjects);
    const Foo = () => {
        const group = new THREE.Group();


        const { scene,  camera,
            gl: { domElement } } = useThree();
        // console.log(scene);
        meshObjects.forEach((mesh) => {
            // console.log(mesh.geometry.vertices)
            group.add( mesh );

        });
        // scene.add( new THREE.AxesHelper( 20 ) );
        group.position.set(0,0,0);
        scene.add( group );
        return (
            <mesh>
                {/* <boxBufferGeometry /> */}
                {/* <meshPhongMaterial /> */}
            </mesh>
        );
    };
    // orthographic={true} camera={ {fov: 100, near: 0.1, far: 10000, position: [0,2000, 50], zoom:1} }
    return (
        <Canvas>
            <OrthographicCamera makeDefault {...orthoCameraProps}   >
                <CameraControls></CameraControls>
                
            <Foo></Foo>
            <gridHelper size={1000} divisions={10} colorCenterLine={0x888888}></gridHelper>
            <ambientLight args={[0xff0000]} intensity={0.1} />
            <directionalLight position={[0, 0, 5]} intensity={0.5} />
            </OrthographicCamera>
        </Canvas>
    );
};

export default CanvasContainer;
