import React, { useState, useEffect, useContext } from "react"
import { AnimalContext } from "../animal/AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employees.css"


export const EmployeeDetail = (props) => {
    const { animals, getAnimals } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { employees, getEmployees, fireEmployee } = useContext(EmployeeContext)

    const [animal, setAnimals] = useState([{name:{}}])
    const [employee, setEmployee] = useState({location:{}})
    const [location, setLocation] = useState({})

    useEffect(() => {
        getLocations()
        getEmployees()
        getAnimals()
    }, [])

    useEffect(() => {
        const employee = employees.find(e => e.id === parseInt(props.match.params.employeeId)) || {location:{}}
        setEmployee(employee)
    }, [employees])

    useEffect(() => {
        const location = locations.find(l => l.id === employee.location_id) || {}
        const animal = animals.filter(a => a.location_id === location.id) || {}
        setLocation(location)
        setAnimals(animal)
    }, [employee])


    return (
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            <div>Currently working at { employee.location.name }</div>
            <div>
                {
                (animal === null)
                    ? "Not assigned to an animal"
                    : `Currently taking care of ${animal.map(a => a.name).join(", ")}`
                }
            </div>
            <button onClick={() => {
                fireEmployee(employee.id)
                props.history.push("/employees")}
                }>Fire Employee</button>
        </section>
    )
}