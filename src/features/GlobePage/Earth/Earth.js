import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three";
import earth from '../../../assets/images/earth.png';
import { useRef } from "react";

export default function Earth(props) {
    const texture = useLoader(TextureLoader, earth);
    const mesh = useRef();

    useFrame(() => {
        if(props.globeAnimating) {
            mesh.current.rotation.y += Math.PI / 1024;
        }
    });

    return (
        <mesh ref={mesh} rotation={[...props.coordinates, 0]}>
            <sphereGeometry args={[2.25, 64, 64]}/>
            <meshStandardMaterial map={texture}/>
        </mesh>
    )
}