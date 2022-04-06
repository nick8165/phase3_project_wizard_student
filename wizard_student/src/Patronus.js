import React, { useState, useEffect } from "react";
import { images } from "./Images"
import { Container, Card } from "react-bootstrap"

function Patronus({studentProfile, handleRerender}) {

    const [patronus, setPatronus] = useState("")
    
    
    
    return (
        <Container style={{ width: '25rem',  }} className="mb-5">
            {changeDisplay()}
        </Container>
    )
}

export default Patronus