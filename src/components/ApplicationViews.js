import React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { AnimalForm } from "./animal/AnimalForm"
import { AnimalDetail } from "./animal/AnimalDetail"
import { CustomerProvider } from "./customer/CustomerProvider"
import { CustomerList } from "./customer/CustomerList"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { EmployeeList } from "./employee/EmployeeList"
import { EmployeeForm } from "./employee/EmployeeForm"
import { EmployeeDetail } from "./employee/EmployeeDetail"
import { LocationProvider } from "./location/LocationProvider"
import { LocationList } from "./location/LocationList"
import { LocationForm } from "./location/LocationForm"
import { LocationDetail } from "./location/LocationDetail"

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
                <Route path="animals/edit/:animalId/*" element={<AnimalForm />} />
                <Route path="animals/detail/:animalId/*" element={<AnimalDetail />} />

                <Route path="locations/*" element={<LocationList />} />
                <Route path="locations/create/*" element={<LocationForm />} />
                <Route path="locations/edit/:locationId/*" element={<LocationForm />} />
                <Route path="locations/detail/:locationId/*" element={<LocationDetail />} />

                <Route path="customers/*" element={<CustomerList />} />

                <Route path="employees/*" element={<EmployeeList />} />
                <Route path="employees/create/*" element={<EmployeeForm />} />
                <Route path="employees/edit/:employeeId/*" element={<EmployeeForm />} />
                <Route path="employees/detail/:employeeId/*" element={<EmployeeDetail />} />

            </Routes>
        </LocationProvider>
        </EmployeeProvider>
        </CustomerProvider>
        </AnimalProvider>
    )
}
