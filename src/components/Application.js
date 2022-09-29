import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   // you may put the line below, but will have to remove/comment hardcoded appointments variable
  //   appointments: {},
  //   interviewers: {}
  // });

  // const setDay = day => setState({ ...state, day });

  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // }

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('/api/days'),
  //     axios.get('/api/appointments'),
  //     axios.get('/api/interviewers')
  //   ]).then((all) => {
  //     const days = all[0].data;
  //     const appointments = all[1].data;
  //     const interviewers = all[2].data;
  //     setState(prev => ({ ...prev, days, appointments, interviewers }));
  //   });
  // }, []);

  //////////////////////////////////////////////////////////////////
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    // console.log("bruh");
    // console.log(appointment.interview);
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });
  //////////////////////////////////////////////////////////////////

//   function bookInterview(id, interview) {

//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment).then((response) => {
//       console.log("response", response);
//       setState({
//           ...state,
//           appointments
//         });
//     })
//   }

//   function cancelInterview (id) {
//     console.log(id);

//     const appointment = {
//       ...state.appointments[id],
//       interview: null
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment).then((response) => {
//       setState({
//         ...state,
//         appointments
//       })
//     });
// }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={appointment.interview}
              interviewers={interviewers}
              allInterviewers={state.interviewers}
              bookInterview={bookInterview}
              onDelete={cancelInterview}
            />
          )
        })}
        <Appointment key="last" time="5pm" bookInterview={bookInterview} />
      </section>
    </main>
  );
}
