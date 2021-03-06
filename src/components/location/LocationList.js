import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { LocationContext } from "./LocationProvider"
import { LocationCard } from "./LocationCard"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import "./Location.css"

export const LocationList = () => {
  // This state changes when `getLocations()` is invoked below
  const { locations, getLocations } = useContext(LocationContext)
  const { employees, getEmployees } = useContext(EmployeeContext)
  const { animals, getAnimals } = useContext(AnimalContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("LocationList: useEffect - getLocations")
    getLocations()
    .then(getEmployees)
    .then(getAnimals)
  }, [])

  const navigate = useNavigate()

  return (
    <>
      <h2>Locations</h2>
      <button onClick={() => {navigate("create")}}>
          New Location
      </button>
      <div className="locations">
          {console.log("LocationList: Render", locations)}

          {/* .length of something??? Find the employees and animals match location's id, then get the count for each one */}
          {locations.map(location => {
            const employeeByLocation = location.employees.filter(e => e.locationId === location.id)
            const animalByLocation = location.animals.filter(a => a.locationId === location.id)
            // {console.log(employeeByLocation)}
            const employeeCount = employeeByLocation.length
            const animalCount = animalByLocation.length
              return <LocationCard      
                            key={location.id}
                            location={location}
                            employeeCount={employeeCount}
                            animalCount={animalCount}
                    />
              })
            }
      </div>
    </>
  )
}
  {/* Previous code, before Ch. 8:
          {
              locations.map(location => <LocationCard key={location.id} location={location} />)
          } */}