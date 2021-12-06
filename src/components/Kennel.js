import React, { useState } from "react";
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import "./Kennel.css";
import { Routes, Route, Navigate } from "react-router";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const Kennel = () => {
  const [loggedin, setLoggedin] = useState(false);

  const changeState = (bool) => setLoggedin(bool);

  if (localStorage.getItem("kennel_customer")) {
    return (
      <>
        <NavBar />
        <ApplicationViews />
      </>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="/login" element={<Login setLoggedin={changeState} />} />
        <Route path="/register" element={<Register setLoggedin={changeState} />} />
      </Routes>
    );
  }
};



////Previous imports and code, before Ch. 10:
// import React from "react"
// import { NavBar } from "./nav/NavBar"
// import { ApplicationViews } from "./ApplicationViews"
// import "./Kennel.css"

// export const Kennel = () => (
//     <>
//         <NavBar />
//         <ApplicationViews />
//     </>
// )


////Previous imports and code, before Ch. 4
// import { AnimalCard } from "./animal/AnimalCard"
// import { EmployeeCard } from "./employee/EmployeeCard"
// import { LocationCard } from "./location/LocationCard"
// import { CustomerCard } from "./customer/CustomerCard"
// import { PropsAndState } from "./PropsAndState"

// export const Kennel = () => (
//     <>
//         <h2>Nashville Kennels</h2>
//         <small>Loving care when you're not there.</small>

//         <address>
//             <div>Visit Us at the Nashville North Location</div>
//             <div>500 Puppy Way</div>
//         </address>

//         <PropsAndState yourName={"Amanda"} />

//         <h2>Animals</h2>
//         <article className="animals">
//             <AnimalCard />
//             <AnimalCard />
//             <AnimalCard />
//         </article>

//         <h2>Employees</h2>
//         <article className="employees">
//             <EmployeeCard />
//             <EmployeeCard />
//             <EmployeeCard />
//         </article>

//         <h2>Locations</h2>
//         <article className="locations">
//             <LocationCard />
//             <LocationCard />
//         </article>

//         <h2>Customers</h2>
//         <article className="customers">
//             <CustomerCard />
//             <CustomerCard />
//             <CustomerCard />
//             <CustomerCard />
//         </article>
//     </>
// )
