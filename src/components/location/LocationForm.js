import React, { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { LocationContext } from "./LocationProvider"
import "./Location.css"

export const LocationForm = () => {
    const { addLocation } = useContext(LocationContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the initial state of the form inputs with useState()
    */

    const [location, setLocation] = useState({
      name: "",
      address: ""
    });

    const navigate = useNavigate();

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newLocation = { ...location }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newLocation[event.target.id] = event.target.value
      // update state
      setLocation(newLocation)
    }

    const handleClickSaveLocation = (event) => {
      event.preventDefault() //Prevents the browser from submitting the form

      const locationId = parseInt(location.id)
      location.id = locationId

      if (locationId === null) {
        window.alert("Please enter a location")
      } else {
        //invoke addAnimal passing animal as an argument.
        //once complete, change the url and display the animal list
        addLocation(location)
        .then(() => navigate("/locations"))
      }
    }

    return (
      <form className="locationForm">
          <h2 className="locationForm__title">New Location</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Location name: </label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location name" value={location.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="address">Address: </label>
                  <input type="text" id="address" onChange={handleControlledInputChange} required className="form-control" placeholder="Address" value={location.address}/>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={handleClickSaveLocation}>
            Save
          </button>
      </form>
    )
}
