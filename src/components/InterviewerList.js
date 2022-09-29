import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types'; 

export default function InterviewerList(props) {
  // console.log(props.interviewers);
  const interviewers = props.interviewers.map((value) => {
    return (
      <InterviewerListItem
        key={value.id}
        name={value.name}
        avatar={value.avatar}
        selected={value.id === props.interviewer}
        setInterviewer={() => props.onChange(value.id)}
      />
    );
  });
  // console.log(interviewers);
  // const interviewers = props.interviewers;
  // const allInterviews = interviewers.map((interviewers) =>
  //   <InterviewerListItem
  //     key={interviewers.id}
  //     id={interviewers.id}
  //     name={interviewers.name}
  //     avatar={interviewers.avatar}
  //     selected={props.interviewer}
  //     setInterviewer={props.setInterviewer}
  //   />
  // );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};