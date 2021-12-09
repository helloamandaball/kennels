import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { AnimalContext } from "./AnimalProvider"
// import { LocationContext } from "../location/LocationProvider"
// import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"
// import { AnimalSearch } from "./AnimalSearch"

export const AnimalList = () => {
  const { animals, getAnimals, searchTerms } = useContext(AnimalContext)

  // Since you are no longer ALWAYS displaying all of the animals
  const [ filteredAnimals, setFiltered ] = useState([])
  const navigate = useNavigate()

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getAnimals()
  }, [])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms.toLowerCase()))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all animals
      setFiltered(animals)
    }
  }, [searchTerms, animals])

  return (
    <>
      <h2>Animals</h2>
      <button onClick={() => navigate("/animals/create")}>
          Make Reservation
      </button>
      <div className="animals">
      {
        filteredAnimals.map(animal => {
          return <AnimalCard key={animal.id} animal={animal} />
        })
      }
      </div>
    </>
  )
}


////Code before CH.14:
// export const AnimalList = () => {
//   // This state changes when `getAnimals()` is invoked below
//   const { animals, getAnimals } = useContext(AnimalContext)
//   const { locations, getLocations } = useContext(LocationContext)
//   const { customers, getCustomers } = useContext(CustomerContext)

//   //useEffect - reach out to the world for something
//   useEffect(() => {
//     console.log("AnimalList: useEffect - getAnimals")
//     getLocations()
//     .then(getCustomers)
//     .then(getAnimals)
//   }, [])

//   const navigate = useNavigate()

//   return (
//     <>
//       <h2>Animals</h2>
//       <button onClick={() => {navigate("create")}}>
//           Add Animal
//       </button>
//       <div className="animals">
//           {console.log("AnimalList: Render", animals)}
//           {animals.map(animal => {
//             const owner = customers.find(c => c.id === animal.customerId)
//             const clinic = locations.find(l => l.id === animal.location)

//             return <AnimalCard 
//                           key={animal.id}
//                           location={clinic}
//                           customer={owner}
//                           animal={animal} 
//                   />
//             })
//           }

//           {/* Previous code, before Ch. 8: 
//           {animals.map(animalObj => <AnimalCard key={animalObj.id} animal={animalObj} />)} */}
//       </div>
//     </>
//   )
// }
