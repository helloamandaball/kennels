import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"

export const EmployeeDetail = () => {
  const { getEmployeeById, deleteEmployee } = useContext(EmployeeContext)

	const [employee, setEmployee] = useState({})

	const {employeeId} = useParams();
	const navigate = useNavigate();

  // Use for delete:
  const handleRelease = () => {
    deleteEmployee(employee.id)
      .then(() => {
        navigate("/employees")
      })
  }

  useEffect(() => {
    console.log("useEffect", employeeId)
    getEmployeeById(employeeId)
    .then((response) => {
      setEmployee(response)
    })
    }, [])

  return (
    <section className="employee">
      <h3 className="employee__name">{employee.name}</h3>
      <div className="employee__location">Location: {employee.location?.name}</div>
      <button onClick={handleRelease}>Delete Employee</button>
      <button onClick={() => {navigate(`/employees/edit/${employee.id}`)}}>Edit</button>
    </section>
  )
}