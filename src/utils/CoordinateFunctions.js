export default function decimalCoordinatesToSphereXAndYRotation(latitude, longitude) {
    // Need to convert to radians from (0, 0)
    // There are 2pi radians in a full circle (360 degrees)
    // Therefore, 1 degree of longitude is 1/360 degrees, or 1/2pi radians. 
    // So whatever degrees longitude, divide it by 2pi to get the radian y rotation
    let centeringYRotation = Math.PI / -2;
    let radialX = latitude * (Math.PI / 180);
    let radialY = longitude * (Math.PI / -180) + centeringYRotation;

    return [radialX, radialY];
}