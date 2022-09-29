import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Status";
import Confirm2 from "./Confirm";
import Error from "./Error"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE"
const CONFIRM = "CONFRIM"
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  // console.log("props", props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    }).catch((error) => {
      console.log(error)
      transition(ERROR_SAVE, true);
    });    
  }

  function deleting () {
    transition(DELETE, true);

    props.onDelete(props.id).then(() => {
      transition(EMPTY);
    }).catch((error) => {
      console.log(error)
      transition(ERROR_DELETE, true);
    })
  }

  function confirmWindow () {
    transition(CONFIRM);
  }

  function cancelDelete () {
    transition(SHOW);
  }

  function edit() {
    transition(EDIT);
  }
  
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.allInterviewers}
          onDelete={confirmWindow}
          onEdit={edit}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVING && <Confirm message="Saving"/>}
      {mode === DELETE && <Confirm message="Deleting"/>}
      {mode === CONFIRM && <Confirm2 message="Are you sure you would like to delete?" onConfirm={deleting} onCancle={cancelDelete}/>}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer} interviewers={props.interviewers} onCancel={cancelDelete} onSave={save}/>}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={back}/>}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={back}/>}

    </article>
  );
}