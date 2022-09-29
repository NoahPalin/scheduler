import React from "react";
import "components/DayListItem.scss"
const classNames = require('classnames');


export default function DayListItem(props) {
  const formatSpots = function (props) {
    let numOfSpots = props.spots;
    if (!numOfSpots) {
      numOfSpots = 0;
    }

    if (numOfSpots === 0) {
      const message = "no spots remaining";
      return message;
    } else if (numOfSpots === 1) {
      const message = "1 spot remaining";
      return message;
    } else if (numOfSpots > 1) {
      const message = `${numOfSpots} spots remaining`
      return message;
    }
  };

  const dayClass = classNames('day-list__item', { 'day-list__item--selected': props.selected }, { 'day-list__item--full': props.spots === 0 });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}