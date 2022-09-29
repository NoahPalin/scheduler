import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const allItems = props.days.map((values) =>
    <DayListItem
      key={values.id}
      name={values.name}
      spots={values.spots}
      selected={values.name === props.day}
      onChange={values.onChange}
      setDay={props.setDay}
    />
  );
  
  return (
    <ul>
      {allItems}
    </ul>
  );
}