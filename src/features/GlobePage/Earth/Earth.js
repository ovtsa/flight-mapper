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

    const rotateGlobeToPosition = (targetRadianX, targetRadianY, secondsOfAnimation = 1.5, framesPerSecond = 100) => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        // position function: p = ((a(t^2)) / 2) + vt + s
        // p = radial position of globe according to time elapsed
        // a = constant acceleration (rad/second^2)
        // t = time since animation started 
        // v = initial velocity (rad/second)
        // s = starting position (rad)

        // What variables do we know? 
        // p = ?
        // a = 2(Pfinal - Pinitial) / Tfinal^2 
        // t = currentFrame / framesPerSecond 
        // v = 0 
        // s = (beginningRadianX, beginningRadianY)
        // so simplified p function: p = ((a((currentFrame / framesPerSecond)^2)) / 2) + beginningRadianXY

        const beginningRadianX = mesh.current.rotation.x;
        const beginningRadianY = mesh.current.rotation.y;
        const totalAnimationFrameCount = secondsOfAnimation * framesPerSecond;
        const accelerationX = 4 * (targetRadianX - beginningRadianX) / (secondsOfAnimation ** 2);
        const accelerationY = 4 * (targetRadianY - beginningRadianY) / (secondsOfAnimation ** 2);
        let currentFrame = 0;

        const animationInterval = setInterval(() => {
            let accelerating = currentFrame < totalAnimationFrameCount / 2;

            if (accelerating) {
                // p = a(t^2)/2 + Vinitial(T) + Pinitial
                mesh.current.rotation.x = ((accelerationX * ((currentFrame / framesPerSecond) ** 2)) / 2) + beginningRadianX;
                mesh.current.rotation.y = ((accelerationY * ((currentFrame / framesPerSecond) ** 2)) / 2) + beginningRadianY;
            } else {
                const vInitX = accelerationX * secondsOfAnimation / 2;
                const vInitY = accelerationY * secondsOfAnimation / 2;
                const t = (currentFrame - (totalAnimationFrameCount / 2)) / framesPerSecond;

                mesh.current.rotation.x = beginningRadianX + ((targetRadianX - beginningRadianX) / 2) + (vInitX * t) - (0.5 * (accelerationX * t ** 2));
                mesh.current.rotation.y = beginningRadianY + ((targetRadianY - beginningRadianY) / 2) + (vInitY * t) - (0.5 * (accelerationY * t ** 2));
            }

            currentFrame++;

            if (currentFrame >= totalAnimationFrameCount) {
                clearInterval(animationInterval);
                mesh.current.rotation.x = targetRadianX;
                mesh.current.rotation.y = targetRadianY;
                freezePassiveAnimation.current = false;
            }
        }, 1000 / framesPerSecond);
    }

    return (
        <mesh ref={mesh} rotation={[...decimalCoordinatesToSphereXAndYRotation(0, 0), 0]}>
            <sphereGeometry args={[2.25, 64, 64]}/>
            <meshStandardMaterial map={texture}/>
        </mesh>
    )
}