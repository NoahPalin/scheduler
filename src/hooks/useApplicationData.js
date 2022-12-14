import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  function bookInterview(id, interview, mode) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments
      });
    }).then(() => {
      const getDayIndex = state.days.findIndex(value => value.name === state.day);

      if (mode === "EDIT") {
        const newDayInformation = { ...state.days[getDayIndex], spots: state.days[getDayIndex].spots };
        const updatedState = state.days;
        updatedState[getDayIndex] = newDayInformation;

        setDays(updatedState);
      } else {
        const newDayInformation = { ...state.days[getDayIndex], spots: state.days[getDayIndex].spots - 1 };
        const updatedState = state.days;
        updatedState[getDayIndex] = newDayInformation;

        setDays(updatedState);
      }
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then((response) => {
      const getDayIndex = state.days.findIndex(value => value.name === state.day)
      const newDayInformation = { ...state.days[getDayIndex], spots: state.days[getDayIndex].spots + 1 }

      const updatedState = state.days;
      updatedState[getDayIndex] = newDayInformation;

      setDays(updatedState);
    });
  }

  const useApplicationObject = {
    state: state,
    setDay,
    bookInterview,
    cancelInterview
  }
  return useApplicationObject;
}
