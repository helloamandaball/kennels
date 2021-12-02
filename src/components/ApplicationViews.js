import React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { AnimalForm } from "./animal/AnimalForm"
import { CustomerProvider } from "./customer/CustomerProvider"
import { CustomerList } from "./customer/CustomerList"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { EmployeeList } from "./employee/EmployeeList"
import { LocationProvider } from "./location/LocationProvider"
import { LocationList } from "./location/LocationList"

export const ApplicationViews = () => {
    return (
        <AnimalProvider>
        <CustomerProvider>
        <EmployeeProvider>
        <LocationProvider>
            <Routes>
                {/* Render the location list when http://localhost:3000/ */}
                <Route path="/" element={<Home />} />
                {/* Render the animal list when http://localhost:3000/animals */}
                <Route path="animals/*" element={<AnimalList />} />
                <Route path="animals/create/*" element={<AnimalForm />} />
                <Route path="locations/*" element={<LocationList />} />
                <Route path="customers/*" element={<CustomerList />} />
                <Route path="employees/*" element={<EmployeeList />} />
            </Routes>
        </LocationProvider>
        </EmployeeProvider>
        </CustomerProvider>
        </AnimalProvider>
    )
}
