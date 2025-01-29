export function decimalCoordinatesToSphereXAndYRotation(latitude: number, longitude: number): [number, number] {
    // Need to convert to radians from (0, 0)
    // There are 2pi radians in a full circle (360 degrees)
    // Therefore, 1 degree of longitude is 1/360 degrees, or 1/2pi radians. 
    // So whatever degrees longitude, divide it by 2pi to get the radian y rotation
    let centeringYRotation = Math.PI / -2;
    let radialX = latitude * (Math.PI / 180);
    let radialY = longitude * (Math.PI / -180) + centeringYRotation;

    return [radialX, radialY];
}

export function sphereXAndYRotationToDecimalCoordinates(radialX: number, radialY: number) {
    // Need to convert from degrees to radians 

    //let latitude = radialX / (Math.PI / 180);
    //let longitude = (radialY - (Math.PI / -2)) / (Math.PI / -180);
    let latitude = 180 * radialX / Math.PI;
    let longitude = -90 - (180 * radialY / Math.PI);

    return [latitude, longitude];
}