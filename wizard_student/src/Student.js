import { Container, Form, Card } from "react-bootstrap"
import React, { useState, useEffect } from 'react';

function Student( {selectedStudent, handleDelete} ) {
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState("")
    const [students, setStudents] = useState([])
    const [createStudent, setCreateStudent] = useState(0)

    useEffect(() => {
        fetch('http://localhost:9292/students')
            .then(res => res.json())
            .then(json => setStudents(json))
    }, [createStudent]) 

    function handleChange(e) {
        let input = e.target.id
        
        switch(input) {
            case("1"):
                setFirstName(e.target.value)
                break;
            case("2"):
                setLastName(e.target.value)
                break;
            case("3"):
                setAge(e.target.value)
                break;
            case("4"):
                setGender(e.target.value)
                break;
            default:
                console.log(e.target.value)
                break;
        }
      }

    function handleSubmit(e) {
        e.preventDefault()
        if (firstName === "" || lastName === "" || age === "0" || gender === "") {
            console.log('need more info')
        } else {
            fetch('http://localhost:9292/students', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    age: parseInt(age),
                    gender: gender
                }),
            })
                .then((r) => r.json())
                .then((json) => setCreateStudent(json.id))
        }
    }

    function loop() {
        let array = []
        let n = 100
        for (let i = 0; i < n; i++) {
            array.push(i)
        }
        return array
    }

    function displayStudents(students) {
        if (students !== []) {
            return students.map((stu) => {
                return <option key={stu.id} value={stu.id}>{stu.first_name} {stu.last_name}</option>
            })
        } else {console.log('...loading')}
    }
  
    return (
        <Container>
            <Card style={{ width: '20rem',  }} className="mb-5">
                <Card.Header><h4>Become A Student</h4></Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <label>First Name</label>
                        <input id="1" type="text" onChange={handleChange} />
                        <label>Last Name</label>
                        <input id="2" type="text" onChange={handleChange} />
                        <label>Age</label>
                        <select id="3" onChange={handleChange}>{loop().map((num) => {return <option key={num} value={num}>{num}</option>})}</select>
                        <label>Gender</label>
                        <select id="4" onChange={handleChange}>
                            <option value="">Choose a gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="fluid">Fluid</option>
                            <option value="they">They/Them</option>
                            <option value="nonbinary">Non-Binary</option>
                        </select>
                        <input type="submit" />
                    </Form>
                </Card.Body>
            </Card>
            <h2>After Enrolling Or If Already Enrolled, Load Your Profile</h2>
            <Card style={{ width: '20rem',  }} className="mb-5">
                <Card.Header><h4>Load Your Student Profile</h4></Card.Header>
                <Card.Body>
                    <select onChange={selectedStudent}>
                        <option>student profile</option>
                        {displayStudents(students)}
                    </select>
                    <button onClick={handleDelete}>Delete Profile</button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Student