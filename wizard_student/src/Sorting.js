import React, { useState } from "react";
import { Container, Form, Card } from "react-bootstrap"
import { questions } from "./Questions";
import { houseImages } from "./houseImages";

function Sorting({studentProfile, handleRerender}) {
    
    const [answer, setAnswer] = useState({one: "", two: "", three: "", four: "", five: ""})

    function handleOptionChange(e) {
        let form = e.target.closest("Form")
        
        switch(form.id) {
            case("1"):
                setAnswer({...answer, one: e.target.value})
                break;
            case("2"):
                setAnswer({...answer, two: e.target.value})
                break;
            case("3"):
                setAnswer({...answer, three: e.target.value})
                break;
            case("4"):
                setAnswer({...answer, four: e.target.value})
                break;
            case("5"):
                setAnswer({...answer, five: e.target.value})
                break;
            default:
                console.log(e.target.value)
                break;
        }
      }

      function buildHouseCard() {
        let foundImage = houseImages.filter(img => img.id === studentProfile.house_id)
        if (foundImage == false) {
            console.log('empty')
        } else {
          return (<Card style={{ width: '20rem',  }} className="mb-5">
                      <Card.Header><h3>You Belong To House</h3></Card.Header>
                      <Card.Body><h4>{foundImage[0].house}</h4><img src={foundImage[0].img} alt="...Loading" /></Card.Body>
                  </Card>)
        }
    }

    function displayQuestion(questions) {
        let newArray = [...questions]
        return (<div>
                    <h1>Sorting Hat Quiz</h1>
                    {newArray.map((quest) => {
                        return (<Card key={quest.id} style={{ width: '20rem',  }} className="mb-5">
                                    <Card.Header>{quest.question}</Card.Header>
                                    <Card.Body>
                                        <Form id={quest.id} className="mb-3" >
                                            <select onChange={handleOptionChange}>
                                                <option>select answer</option>
                                                {quest.answers.map((answer) => {return (<option key={answer.answer} value={answer.score}>{answer.answer}</option>)})}
                                            </select>    
                                        </Form>
                                    </Card.Body>
                                </Card>
                                )})}
                    <Form onSubmit={handleSubmit}>
                        <input type="submit" />
                    </Form>    
                </div>)
    }

    function toggleDisplay() {
        if(studentProfile.house_id !== null) {
            return buildHouseCard()
        } else {
            return displayQuestion(questions)
        }
    }

    return (
        <Container style={{ width: '25rem',  }} className="mb-5">
            {toggleDisplay()}
        </Container>
    )
}

function hightestCount(r, g, h, s) {
    let highest = (r.length > g.length ? r : g)
    let nextHighest = (highest > h ? highest : h)
    let lastHighest = (nextHighest > s ? nextHighest : s)
    return lastHighest
}

function fetchHouse(id) {
    fetch(`http://localhost:9292/students/${studentProfile.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                house_id: id,
                patronus_animal_id: studentProfile.patronus_animal_id
            }),
        })
            .then((response) => response.json())
            .then((json) => handleRerender(json))
}

export default Sorting