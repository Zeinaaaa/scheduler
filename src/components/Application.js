import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import useApplicationData from "hooks/useApplicationData";
import { getInterview, getInterviewersForDay, getAppointmentsForDay } from "helpers/selectors";



export default function Application(props) {

  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentsList = dailyAppointments.map(appointment => {
    const interviewName = getInterview(state, appointment.interview)    
    return <Appointment 
      key={appointment.id} 
      id={appointment.id}
      time={appointment.time}
      interview={interviewName}
      interviewers={getInterviewersForDay(state, state.day)}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  });
  

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
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {console.log("state",state)}
       <ul> { appointmentsList } 
        <Appointment key="last" time="5pm" />   
       </ul>     
      </section>
      
    </main>
  );
}
