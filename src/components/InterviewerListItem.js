import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {

  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  const showName = () => {
    let name = ``;
    if (props.selected) {
      name = props.name;
    }
    return name;
  }

  return (
    <li onClick={props.setInterviewer} className={interviewClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {showName()}
    </li>
  );
}

