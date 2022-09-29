export function getAppointmentsForDay(state, day) {
  // const filteredNames = state.users.filter(user => user.name === name);
  // return filteredNames;

  const allAppointments = state.days.filter(object => object.name === day);
  // console.log(allAppointments);

  if (allAppointments.length === 0) {
    return [];
  }

  const appointmentList = allAppointments[0].appointments;
  // console.log(appointmentList)

  let results = [];
  for (let id of appointmentList) {
    results.push(state.appointments[id]);
  }
  return results;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  
  for (const key in state.appointments){
    if (state.appointments[key].interview) {
      // console.log("here");
      // console.log(state.appointments[key].interview.student);

      let interviewerId = state.appointments[key].interview.interviewer;
      const interviewObject = {
        student: interview.student,
        interviewer: state.interviewers[interviewerId]
      }
    
      return interviewObject;
    }
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  if (!state.days) {
    return [];
  }
  // const filteredNames = state.users.filter(user => user.name === name);
  // return filteredNames;

  const dayObj = state.days.find(object => object.name === day);
  // console.log(allAppointments);

  if (!dayObj) {
    return [];
  }

  const interviewers = dayObj.interviewers;
  // console.log(appointmentList)

  let results = [];
  for (let id of interviewers) {
    results.push(state.interviewers[id]);
  }
  return results;
}