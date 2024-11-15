import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three";
import earth from '../../../assets/images/earth.png';
import { useEffect, useRef } from "react";
import { decimalCoordinatesToSphereXAndYRotation, sphereXAndYRotationToDecimalCoordinates } from "../../../utils/CoordinateFunctions";

export default function Earth(props) {
    const texture = useLoader(TextureLoader, earth);
    const mesh = useRef();
    const freezePassiveAnimation = useRef(false);
    const firstRender = useRef(true);

    useFrame(() => {
        if(props.globeAnimating && !freezePassiveAnimation.current) {
            mesh.current.rotation.y += Math.PI / 1024;
        }
    });

    useEffect(() => {
        if (!props.globeAnimating) {
            rotateGlobeToPosition(...props.coordinates);
        } else {
            rotateGlobeToPosition(0, mesh.current.rotation.y);
        }
    }, [props.coordinates, props.globeAnimating]);

    const rotateGlobeToPosition = (radianX, radianY) => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        // this will do for now 
        freezePassiveAnimation.current = true;
        let count = 0;

        const t = setInterval(() => {
            // do the panning 
            // improve this algorithm later 
            let radianDifferential = [radianX - mesh.current.rotation.x, radianY - mesh.current.rotation.y];
            mesh.current.rotation.x += radianDifferential[0] * 0.025;
            mesh.current.rotation.y += radianDifferential[1] * 0.025;

            count++;
            if (count >= 200) {
                clearInterval(t);
                mesh.current.rotation.x = radianX;
                mesh.current.rotation.y = radianY;
                freezePassiveAnimation.current = false;
            }

        }, 10);
    }

    return (
        <mesh ref={mesh} rotation={[...decimalCoordinatesToSphereXAndYRotation(0, 0), 0]}>
            <sphereGeometry args={[2.25, 64, 64]}/>
            <meshStandardMaterial map={texture}/>
        </mesh>
    )
}