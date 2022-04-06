import React, { useState, useEffect } from "react";
import { images } from "./Images"
import { Container, Card } from "react-bootstrap"

function Patronus({studentProfile, handleRerender}) {

    const [patronus, setPatronus] = useState("")

    useEffect(() => {
        fetch('http://localhost:9292/patronus_animals')
            .then(res => res.json())
            .then(json => setPatronus(json))
    }, [])
    
    
    
    return (
        <Container style={{ width: '25rem',  }} className="mb-5">
            {changeDisplay()}
        </Container>
    )
}

export default Patronus