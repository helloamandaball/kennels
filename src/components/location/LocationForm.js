import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { LocationContext } from "./LocationProvider"
// import { AnimalContext } from "../animal/AnimalProvider"
// import { CustomerContext } from "../customer/CustomerProvider"
import "./Location.css"

export const LocationForm = () => {
  const { addLocation, getLocationById, updateLocation } = useContext(LocationContext)
  // const { customers, getCustomers } = useContext(CustomerContext)
  // const { animals, getAnimals } = useContext(AnimalContext)

  //for edit, hold on to state of location in this view
  const [location, setLocation] = useState({})
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  const {locationId} = useParams();
  const navigate = useNavigate();

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newLocation= { ...location }
    //location is an object with properties.
    //set the property to the new value
    newLocation[event.target.name] = event.target.value
    //update state
    setLocation(newLocation)
  }

  const handleSaveLocation = () => {
    if (parseInt(locationId) === null) {
        window.alert("Please enter a location")
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (locationId){
        //PUT - update
        updateLocation({
            id: locationId,
            name: location.name,
            address: location.address
        })
        .then(() => navigate(`/locations/detail/${location.id}`))
      }else {
        //POST - add
        addLocation({
            name: location.name,
            address: location.address
        })
        .then(() => navigate("locations"))
      }
    }
  }

  // Get customers and locations. If locationId is in the URL, getEmployeeById
  useEffect(() => {
    // getCustomers().then(getAnimals).then(() => {
      if (locationId){
        getLocationById(locationId)
        .then(employee => {
            setLocation(employee)
            setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    // })
  }, [])

  //since state controls this component, we no longer need
  //useRef(null) or ref

  return (
    <form className="locationForm">
      <h2 className="locationForm__title">New Location</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="locationName">Location name: </label>
          <input type="text" id="locationName" name="name" required autoFocus className="form-control"
          placeholder="Location name"
          onChange={handleControlledInputChange}
          defaultValue={location.name}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="address">Address: </label>
          <input type="text" id="address" name="address" required autoFocus className="form-control"
          placeholder="Location address"
          onChange={handleControlledInputChange}
          defaultValue={location.address}/>
        </div>
      </fieldset>
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveLocation()
        }}>
        {locationId ? <>Save Location</> : <>Add Location</>}
      </button>
    </form>
  )
}


////Code before CH. 13:
// export const LocationForm = () => {
//     const { addLocation } = useContext(LocationContext)

//     /*
//     With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

//     Define the initial state of the form inputs with useState()
//     */

//     const [location, setLocation] = useState({
//       name: "",
//       address: ""
//     });

//     const navigate = useNavigate();

//     //when a field changes, update state. The return will re-render and display based on the values in state
//     //Controlled component
//     const handleControlledInputChange = (event) => {
//       /* When changing a state object or array,
//       always create a copy, make changes, and then set state.*/
//       const newLocation = { ...location }
//       /* Animal is an object with properties.
//       Set the property to the new value
//       using object bracket notation. */
//       newLocation[event.target.id] = event.target.value
//       // update state
//       setLocation(newLocation)
//     }

//     const handleClickSaveLocation = (event) => {
//       event.preventDefault() //Prevents the browser from submitting the form

//       const locationId = parseInt(location.id)
//       location.id = locationId

//       if (locationId === null) {
//         window.alert("Please enter a location")
//       } else {
//         //invoke addAnimal passing animal as an argument.
//         //once complete, change the url and display the animal list
//         addLocation(location)
//         .then(() => navigate("/locations"))
//       }
//     }

//     return (
      // <form className="locationForm">
      //     <h2 className="locationForm__title">New Location</h2>
      //     <fieldset>
      //         <div className="form-group">
      //             <label htmlFor="name">Location name: </label>
      //             <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location name" value={location.name}/>
      //         </div>
      //     </fieldset>
      //     <fieldset>
      //         <div className="form-group">
      //             <label htmlFor="address">Address: </label>
      //             <input type="text" id="address" onChange={handleControlledInputChange} required className="form-control" placeholder="Address" value={location.address}/>
      //         </div>
      //     </fieldset>
      //     <button className="btn btn-primary"
      //       onClick={handleClickSaveLocation}>
      //       Save
      //     </button>
      // </form>
//     )
// }
