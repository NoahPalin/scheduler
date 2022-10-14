export function getAppointmentsForDay(state, day) {
  const allAppointments = state.days.filter(object => object.name === day);

  if (allAppointments.length === 0) {
    return [];
  }

  const appointmentList = allAppointments[0].appointments;

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
  };

  const dayObj = state.days.find(object => object.name === day);

  if (!dayObj) {
    return [];
  }

  const interviewers = dayObj.interviewers;

  let results = [];
  for (let id of interviewers) {
    results.push(state.interviewers[id]);
  }
  return results;
}