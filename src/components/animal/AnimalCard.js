import React from "react"
import { Link } from "react-router-dom"
import "./Animal.css"

export const AnimalCard = ({ animal }) => (
    <section className="animal">
        <h3 className="animal__name">
          <Link to={`/animals/detail/${animal.id}`}>
            { animal.name }
          </Link>
        </h3>
        <p className="customer__name">Breed: {animal.breed}</p>
    </section>
)

////Code previous to CH. 11:
// export const AnimalCard = ({ animal, customer, location }) => (
//   <section className="animal">
//       <h3 className="animal__name">
//         <Link to={`/animals/detail/${animal.id}`}>
//           { animal.name }
//         </Link>
//       </h3>
//       <address className="location__address">Location: {animal.location.name}</address>
//       <p className="customer__name">Breed: {animal.breed}</p>
//       <p className="customer__name">Customer: {customer.name}</p>
//   </section>
// )