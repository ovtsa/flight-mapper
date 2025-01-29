/* TBI: Globe and components 
*/

import { Canvas } from "@react-three/fiber";
import "./GlobePage.css";
import Earth from "./Earth/Earth";
import SelectionForm from "./SelectionForm/SelectionForm";
import { CSVObjectType, parseCSV } from "../../utils/CSVHelperFunctions";
import { BinarySearchTree } from "@datastructures-js/binary-search-tree";
import { DataContext } from "../../components/DataContext/DataContext";
import { useEffect, useState } from "react";
import { decimalCoordinatesToSphereXAndYRotation} from "../../utils/CoordinateFunctions";

export default function GlobePage() {
    const [airportData, setAirportData] = useState({ airportBst: new BinarySearchTree<CSVObjectType>(), airlineBst: new BinarySearchTree<CSVObjectType>() });
    const [globeCoordinates, setGlobeCoordinates] = useState(decimalCoordinatesToSphereXAndYRotation(0, 0));
    const [globeAnimating, setGlobeAnimating] = useState(true);
    const [airportSelection, setAirportSelection] = useState('');
    const [airlineSelection, setAirlineSelection] = useState('');

    async function getData() {
        // correct this to a backend api call 
        let airlineData: CSVObjectType[] = await (
            fetch("https://raw.githubusercontent.com/benct/iata-utils/refs/heads/master/generated/iata_airlines.csv")
            .then(r => r.text())
            .then(r => parseCSV(r, `^`))
        );

        // correct this to a backend api call 
        let airportData: CSVObjectType[] = await (
            fetch("https://raw.githubusercontent.com/ip2location/ip2location-iata-icao/refs/heads/master/iata-icao.csv")
            .then(r => r.text())
            .then(r => parseCSV(r, `,`))
        );

        let airlineBst = new BinarySearchTree<CSVObjectType>(
            (a: CSVObjectType, b: CSVObjectType) => { 
                return (a.name < b.name ? -1: (a.name > b.name ? 1: 0));   
            }, {key: 'name'}
        );

        for (let i = 0; i < airlineData.length; i++) {
            airlineBst.insert(airlineData[i]);
        }

        
        let airportBst = new BinarySearchTree<CSVObjectType>(
            (a: CSVObjectType, b: CSVObjectType) => {
                return (a.airport < b.airport ? -1: (a.airport > b.airport ? 1: 0));
            }, {key: 'airport'}
        );
        
        for (let i = 0; i < airportData.length; i++) {
            airportBst.insert(airportData[i]);
        }

        setAirportData({airportBst, airlineBst});
    }

    useEffect(() => {
        getData();
    }, []);

    function resetGlobe() {
        setGlobeAnimating(true);
        setGlobeCoordinates(decimalCoordinatesToSphereXAndYRotation(0, 0));
        setAirportSelection('');
        setAirlineSelection('');
    }

    // These functions will always use the input from the form 
    function airportFormSubmitFunction(data: CSVObjectType) {
        setGlobeCoordinates(decimalCoordinatesToSphereXAndYRotation(+data['latitude'], +data['longitude']));
        setGlobeAnimating(false);
        setAirportSelection(data['airport']);
    }

    function airlineFormSubmitFunction(data: CSVObjectType) {
        setAirlineSelection(data['name']);
    }

    return (
        <div className="globe-page-container">
            <DataContext.Provider value={airportData}>
                <div id="canvas-container">
                    <Canvas>
                        <ambientLight intensity={0.2}/>
                        <directionalLight position={[1, 0, 1]} intensity={3} />
                        <Earth coordinates={globeCoordinates} globeAnimating={globeAnimating} />
                    </Canvas>
                </div>
                <SelectionForm type="airport" submitFunction={airportFormSubmitFunction} selection={airportSelection} />
                <SelectionForm type="airline" submitFunction={airlineFormSubmitFunction} selection={airlineSelection} />
                <button onClick={() => resetGlobe()}>Reset Globe</button>
            </DataContext.Provider>
        </div>
    )
}