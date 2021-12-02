import React from "react"
import "./Animal.css"

export const AnimalCard = ({ animal, customer, location }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <address className="location__address">Location: {animal.location.name}</address>
        <p className="customer__name">Breed: {animal.breed}</p>
        <p className="customer__name">Customer: {customer.name}</p>
    </section>
)