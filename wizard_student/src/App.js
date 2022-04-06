
import React, { useEffect, useState } from "react";
import Student from "./Student";
import Patronus from "./Patronus";
import Sorting from "./Sorting";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    
  const [currentStudent, setCurrentStudent] = useState(0)
  const [studentProfile, setStudentProfile] = useState("")

  useEffect(() => {
      if (currentStudent === 0) {
          console.log("")
      } else {
      fetch(`http://localhost:9292/students/${currentStudent}`)
          .then(res => res.json())
          .then(json => setStudentProfile(json))}
  }, [currentStudent])

  function selectedStudent(e) {
      setCurrentStudent(e.target.value)
  }

  function handleDelete() {
      if (currentStudent === 0) {
          console.log("")
      } else {
          fetch(`http://localhost:9292/students/${currentStudent}`, {
              method: 'Delete'
      })
          .then((res) => res.json())
          .then(json => setStudentProfile(""))
      }
  }

  function displayComponent() {
      if (currentStudent === 0) {
          return <div></div>
      } else {
          return (<div><Sorting studentProfile={studentProfile} handleRerender={handleRerender} /> 
          <Patronus studentProfile={studentProfile} handleRerender={handleRerender} /></div>)
      }
  }

  function handleRerender(rerenderStudent) {
      setStudentProfile(rerenderStudent)
  }

  return (
      <div className="App">
          <Student selectedStudent={selectedStudent} handleDelete={handleDelete} />
          {displayComponent()}
      </div>
  );
}

export default App;