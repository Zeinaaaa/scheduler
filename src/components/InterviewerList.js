import React from "react";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
  const interviewers = props.interviewers;
  const interviewerList = interviewers.map((interviewer) => {
    return <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value}    
    setInterviewer={() => props.onChange(interviewer.id)}/>
     
   }
  )


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul   className="interviewers__list ">{interviewerList}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};