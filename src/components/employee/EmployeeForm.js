import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "../employee/EmployeeProvider"
import "./Employee.css"

export const EmployeeForm = () => {
  const { addEmployee, getEmployeeById, updateEmployee } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  //for edit, hold on to state of employee in this view
  const [employee, setEmployee] = useState({})
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  const {employeeId} = useParams();
  const navigate = useNavigate();

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newEmployee = { ...employee }
    //employee is an object with properties.
    //set the property to the new value
    newEmployee[event.target.name] = event.target.value
    //update state
    setEmployee(newEmployee)
  }

  const handleSaveEmployee = () => {
    if (parseInt(employee.locationId) === 0) {
        window.alert("Please select a location")
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (employeeId){
        //PUT - update
        updateEmployee({
            id: employee.id,
            name: employee.name,
            locationId: parseInt(employee.locationId),
        })
        .then(() => navigate(`/employees/detail/${employee.id}`))
      }else {
        //POST - add
        addEmployee({
            name: employee.name,
            locationId: parseInt(employee.locationId),
        })
        .then(() => navigate("/employees"))
      }
    }
  }

  // Get customers and locations. If employeeId is in the URL, getEmployeeById
  useEffect(() => {
    getLocations().then(() => {
      if (employeeId){
        getEmployeeById(employeeId)
        .then(employee => {
            setEmployee(employee)
            setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  //since state controls this component, we no longer need
  //useRef(null) or ref

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="employeeName">Employee name: </label>
          <input type="text" id="employeeName" name="name" required autoFocus className="form-control"
          placeholder="Employee name"
          onChange={handleControlledInputChange}
          defaultValue={employee.name}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select value={employee.locationId} name="locationId" id="employeeLocation" className="form-control" 
          onChange={handleControlledInputChange}>
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveEmployee()
        }}>
        {employeeId ? <>Save Employee</> : <>Add Employee</>}
      </button>
    </form>
  )
}

///Code before CH. 13
// export const EmployeeForm = () => {
//     const { addEmployee } = useContext(EmployeeContext)
//     const { locations, getLocations } = useContext(LocationContext)

//     /*
//     With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

//     Define the initial state of the form inputs with useState()
//     */
//     // const locationIdInt = parseInt(animal.locationId)
//     // const customerIdInt = parseInt(animal.customerId)

//     const [employee, setEmployee] = useState({
//       name: "",
//       locationId: 0
//     });

//     const navigate = useNavigate();

//     /*
//     Reach out to the world and get customers state
//     and locations state on initialization. This is filling the locations within the dropdown menus.
//     */
//     useEffect(() => {
//       // getEmployees().then(getLocations)
//       getLocations()
//     }, [])

//     //when a field changes, update state. The return will re-render and display based on the values in state
//     //Controlled component
//     const handleControlledInputChange = (event) => {
//       /* When changing a state object or array,
//       always create a copy, make changes, and then set state.*/
//       const newEmployee = { ...employee }
//       /* Animal is an object with properties.
//       Set the property to the new value
//       using object bracket notation. */
//       newEmployee[event.target.id] = event.target.value
//       // update state
//       setEmployee(newEmployee)
//     }

//     const handleClickSaveEmployee = (event) => {
//       event.preventDefault() //Prevents the browser from submitting the form

//       const locationId = parseInt(employee.locationId)
//       employee.locationId = locationId

//       if (locationId === null) {
//         window.alert("Please select a location")
//       } else {
//         //invoke addAnimal passing animal as an argument.
//         //once complete, change the url and display the animal list
//         addEmployee(employee)
//         .then(() => navigate("/employees"))
//       }
//     }

//     return (
//       <form className="employeeForm">
//           <h2 className="employeeForm__title">New Employee</h2>
//           <fieldset>
//               <div className="form-group">
//                   <label htmlFor="name">Employee name: </label>
//                   <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name}/>
//               </div>
//           </fieldset>
//           <fieldset>
//               <div className="form-group">
//                   <label htmlFor="location">Assign to location: </label>
//                   <select defaultValue={employee.locationId} name="locationId" id="locationId" className="form-control" onChange={handleControlledInputChange} >
//                       <option value="0">Select a location</option>
//                       {locations.map(l => (
//                           <option key={l.id} value={l.id}>
//                               {l.name}
//                           </option>
//                       ))}
//                   </select>
//               </div>
//           </fieldset>
//           <button className="btn btn-primary"
//             onClick={handleClickSaveEmployee}>
//             Save
//           </button>
//       </form>
//     )
// }
