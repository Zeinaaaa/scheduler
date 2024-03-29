import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const { name, interviewers, interviewer, onSave, onCancel, edit } = props;
  const [student, setStudent] = useState(name || "");                   
  const [director, setInterviewer] = useState(interviewer || null);       
  const [error, setError] = useState("");

  const reset = function() {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = function() {
      reset();
      onCancel();
  };

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (director === null) {
      setError("You should select an interviewer");
      return;
    }
    setError("");
    onSave(student, director, edit);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={student}
            onChange={e => setStudent(e.target.value)}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <p></p>
        <InterviewerList interviewers={interviewers} value={director} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}