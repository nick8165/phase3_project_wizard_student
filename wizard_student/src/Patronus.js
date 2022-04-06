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

    function handleClick() {
        let num = Math.floor(Math.random() * 19) + 1
        fetch(`http://localhost:9292/students/${studentProfile.id}`, {
                method: 'PATCH', 
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    house_id: studentProfile.house_id,
                    patronus_animal_id: num,
                }),
            })
                .then((response) => response.json())
                .then((json) => handleRerender(json))
    }

    function displayRandomButton() {
        return (<Card style={{ width: '20rem',  }} className="mb-5">
                    <Card.Header><h4>Press Button To Retrieve Patronus</h4></Card.Header>
                    <Card.Body><button onClick={handleClick}>Patronus</button></Card.Body>
                </Card>)
    }

    function changeDisplay() {
        if (studentProfile.patronus_animal_id !== null) {
            return displayPatronus()
        } else {
            return displayRandomButton()
        }
    }
    
    return (
        <Container style={{ width: '25rem',  }} className="mb-5">
            {changeDisplay()}
        </Container>
    )
}

export default Patronus