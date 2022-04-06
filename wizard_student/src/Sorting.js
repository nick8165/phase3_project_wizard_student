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

    return (
        <Container style={{ width: '25rem',  }} className="mb-5">
            {toggleDisplay()}
        </Container>
    )
}

export default Sorting