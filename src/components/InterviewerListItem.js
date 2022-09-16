import React from "react";
import "components/InterviewerListItem.scss"
const classNames = require('classnames');

export default function InterviewerListItem(props) {
  // const displayName = function (props) {
  //   if (props.selected === props.id) {
  //     return props.name;
  //   } else {
  //     return '';
  //   }
  // };

  const interviewerClasses = classNames('interviewers__item', { 'interviewers__item--selected': props.selected});
  console.log("props.selected " + props.selected)
  if(props.selected === props.id) {
    console.log("name " + props.name);

  }
  // console.log(props.selected);
  return (
    <li className={interviewerClasses} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

  // return (
  //   <li className={interviewerClasses} onClick={() => props.setInterviewer(props.id)}>
  //     <img
  //       className="interviewers__item-image"
  //       src={props.avatar}
  //       alt={props.name}
  //     />
  //     {displayName(props)}
  //   </li>
  // );
}