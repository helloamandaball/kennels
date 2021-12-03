import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"
import { EmployeeCard } from "./EmployeeCard"
import "./Employee.css"

export const EmployeeList = () => {
  // This state changes when `getEmployees()` is invoked below
  const { employees, getEmployees } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("EmployeeList: useEffect - getEmployees")
    getLocations()
    .then(getEmployees)
  }, [])

  const navigate = useNavigate()

  return (
    <>
      <h2>Employees</h2>
      <button onClick={() => {navigate("create")}}>
          New Employee
      </button>
      <div className="employees">
          {console.log("EmployeeList: Render", employees)}
          {employees.map(employee => {
              // const worker = employees.find(e => e.id === employee.employeeId)
              // const clinic = locations.find(l => l.id === employee.locationId)

              return <EmployeeCard 
                            key={employee.id}
                            employee={employee}
                    />
              })
            }

          {/* Previous code, before Ch. 8: 
          {
              employees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)
          } */}
      </div>
    </>
  )
}
