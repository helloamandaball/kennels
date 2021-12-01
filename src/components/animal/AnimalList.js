import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("AnimalList: useEffect - getAnimals")
    getAnimals()
  }, [])


  return (
    <div className="animals">
        {console.log("AnimalList: Render", animals)}
        {
            animals.map(animal => <AnimalCard key={animal.id} animal={animal} />)
        }
    </div>
  )
}
