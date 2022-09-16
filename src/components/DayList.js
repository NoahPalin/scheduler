import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const values = props.value;
  const allItems = values.map((values) =>
    <DayListItem
      key={values.id}
      name={values.name}
      spots={values.spots}
      selected={values.name === values.value}
      onChange={values.onChange}
    />
  );
  
  return (
    <ul>
      {allItems}
    </ul>
  );
}