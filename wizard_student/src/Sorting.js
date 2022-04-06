import React, { useState } from "react";
import { Container, Form, Card } from "react-bootstrap"
import { questions } from "./Questions";
import { houseImages } from "./houseImages";

function Sorting({studentProfile, handleRerender}) {
    
    

    return (
        <Container style={{ width: '25rem',  }} className="mb-5">
            {toggleDisplay()}
        </Container>
    )
}

export default Sorting