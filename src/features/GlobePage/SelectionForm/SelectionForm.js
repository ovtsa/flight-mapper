import { useContext, useRef, useState } from "react"
import capitalize from "../../../utils/StringFunctions";
import { DataContext } from "../../../components/DataContext/DataContext";
import autoComplete from "../../../utils/BinarySearchTreeFunctions";
import "./SelectionForm.css";

export default function SelectionForm(props) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const dataContext = useContext(DataContext);
    const searchTree = useRef({});
    const propertyName = useRef('');

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);

        switch (props.type) {
            case 'airline':
                searchTree.current = dataContext['airlineBst'];
                propertyName.current = 'name';
                break;
            case 'airport':
                searchTree.current = dataContext['airportBst'];
                propertyName.current = 'airport';
                break;
            default:
                break;
        }

        value.length > 0 ? setSuggestions(autoComplete(searchTree.current.root(), value, propertyName.current, 5)) : setSuggestions([]);
    }

    const handleSelection = (suggestion) => {
        setInputValue(suggestion);
        setSuggestions([]);
    }

    const formSubmitted = (event, submitFunction) => {
        event.preventDefault();
        setSuggestions([]);
        let result = searchTree.current.findKey(inputValue);
        let val = inputValue;
        setInputValue('');

        if (result === null) {
            console.error('Invalid input');
        } else {
            submitFunction(result.getValue());
        }
    }

    return (
        <div className="selection-form-container">
            <div className="form-container">
                <form onSubmit={(e) => { formSubmitted(e, props.submitFunction) }}>
                    <div className="form-input">
                        <label>{capitalize(props.type)}</label>
                        <input value={inputValue} onChange={handleInputChange} />
                        <button disabled={inputValue.length === 0}>Submit</button>
                    </div>
                    <label className="selection-label">{props.selection}</label>
                </form>
            </div>
            <div className="suggestions-container">
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion) => 
                            <li className="suggestion" key={suggestion} onClick={() => handleSelection(suggestion)}>{suggestion}</li>)
                        }
                    </ul>
                )}
            </div>
        </div>
    )
}