import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const handleClick = () => {props.setDay(props.name)};

  const formatSpots = () => {
    let spots = ``;
    if (props.spots === 0 ) {
      spots = `no spots remaining`;
    } else if (props.spots === 1) {
      spots = `1 spot remaining`
    } else {
     spots = `${props.spots} spots remaining`
    }
    return spots;
   }

 


  return (
    <li className={dayClass} onClick={() => handleClick()} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}