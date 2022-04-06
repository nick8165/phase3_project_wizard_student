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

    function displayPatronus() {
        let foundPatronus = images.filter((pat) => pat.id === studentProfile.patronus_animal_id) 
            if (foundPatronus == false) {
                console.log('empty')
            } else {
                return (<Card style={{ width: '25rem',  }} className="mb-5">
                            <Card.Header><h4>Patronus</h4></Card.Header>
                            <Card.Body><img src={foundPatronus[0].img} alt="...Loading" /></Card.Body>
                        </Card>)
            }
    }
    
    
    
    return (
        <Container style={{ width: '25rem',  }} className="mb-5">
            {changeDisplay()}
        </Container>
    )
}

export default Patronus