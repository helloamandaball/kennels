import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"

export const AnimalForm = () => {
    const { addAnimal } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the initial state of the form inputs with useState()
    */
    // const locationIdInt = parseInt(animal.locationId)
    // const customerIdInt = parseInt(animal.customerId)

    const [animal, setAnimal] = useState({
      name: "",
      breed: "",
      locationId: 0,
      customerId: 0
    });

    const navigate = useNavigate();

    /*
    Reach out to the world and get customers state
    and locations state on initialization. This is filling the locations within the dropdown menus.
    */
    useEffect(() => {
      getCustomers().then(getLocations)
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newAnimal = { ...animal }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newAnimal[event.target.id] = event.target.value
      // update state
      setAnimal(newAnimal)
    }

    const handleClickSaveAnimal = (event) => {
      event.preventDefault() //Prevents the browser from submitting the form

      const locationId = parseInt(animal.locationId)
      const customerId = parseInt(animal.customerId)
      animal.locationId = locationId
      animal.customerId = customerId

      if (locationId === null) {
        window.alert("Please select a location")
      } else {
        //invoke addAnimal passing animal as an argument.
        //once complete, change the url and display the animal list
        addAnimal(animal)
        .then(() => navigate("/animals"))//telling it to useNavigate to redisplay updated animal list
      }
    }

    return (
      <form className="animalForm">
          <h2 className="animalForm__title">New Animal</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Animal name: </label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Animal name" value={animal.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="breed">Breed: </label>
                  <input type="text" id="breed" onChange={handleControlledInputChange} className="form-control" placeholder="Breed" value={animal.breed}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to location: </label>
                  <select defaultValue={animal.locationId} name="locationId" id="locationId" className="form-control" onChange={handleControlledInputChange} >
                      <option value="0">Select a location</option>
                      {locations.map(l => (
                          <option key={l.id} value={l.id}>
                              {l.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="customerId">Customer: </label>
                  <select defaultValue={animal.customerId} name="customer" id="customerId" className="form-control" onChange={handleControlledInputChange} >
                      <option value="0">Select a customer</option>
                      {customers.map(c => (
                          <option key={c.id} value={c.id}>
                              {c.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={handleClickSaveAnimal}>
            Save Animal
          </button>
      </form>
    )
}
