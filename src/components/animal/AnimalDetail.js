import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animals.css"

export const AnimalDetails = (props) => {
    const { releaseAnimal, getAnimalById } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext) 
    const { customers, getCustomers } = useContext(CustomerContext) 

    const [animal, setAnimal] = useState({ location: {}, customer: {} })
    const [location, setLocation] = useState({})
    const [customer, setCustomer] = useState({})

    useEffect(() => {
        const animalId = parseInt(props.match.params.animalId)
        getAnimalById(animalId)
            .then(setAnimal)
            .then(getLocations)
            .then(getCustomers)
    }, [])

    useEffect(() => {
        const loc = locations.find(l => l.id === animal.location_id) || {}
        const cust = customers.find(c => c.id === animal.customer_id) || {}
        setLocation(loc)
        setCustomer(cust)
    },[animal])

    return (
        <section className="animal">
            <h3 className="animal__name">{animal.name}</h3>
            <div className="animal__breed">Breed: {animal.breed}</div>
            <div className="animal__location">Location: {location.name}</div>
            <div className="animal__owner">Customer: {customer.name}</div>
            <div className="animal__treatment">Status: {animal.status}</div>

            <button onClick={() => releaseAnimal(animal.id).then(() => props.history.push("/animals"))} >Release Animal</button>

            <button onClick={() => {
                props.history.push(`/animals/edit/${animal.id}`)
            }}>Edit</button>
        </section>
    )
}