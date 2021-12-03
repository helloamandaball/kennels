import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { LocationContext } from "./LocationProvider"
import { LocationCard } from "./LocationCard"
import "./Location.css"

export const LocationList = () => {
  // This state changes when `getLocations()` is invoked below
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("LocationList: useEffect - getLocations")
    getLocations()
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
          {locations.map(location => {
                return <LocationCard 
                              key={location.id}
                              location={location}
                      />
                })
              }

          {/* Previous code, before Ch. 8:
          {
              locations.map(location => <LocationCard key={location.id} location={location} />)
          } */}
      </div>
    </>
  )
}
