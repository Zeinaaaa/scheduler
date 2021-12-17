import { useState, useEffect } from "react";
import axios from "axios";


const useApplicationData = function() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({
        ...prev, 
        days: all[0]["data"], 
        appointments: all[1]["data"],
        interviewers: all[2]["data"]
      }))
    });
  },[]);

  const setDay = day => setState({  ...state, day });

  function spotCalculator (id, boolean = false) {     

    let spot = 0;
    boolean ? spot-- : spot++;
    const days = state.days.filter(ele => {
      return [ele.appointments.find(appId => appId === id) ? ele.spots += spot : null, ele];
    });
    return setState({...state, days});
  };


  const bookInterview = (id, interview, update) => {
    const index = state.days.findIndex((day) => day.name === state.day);

    const day = update
      ? {
          ...state.days[index],
          spots: state.days[index].spots,
        }
      : {
          ...state.days[index],
          spots: state.days[index].spots - 1,
        };

    let days = [...state.days];
    days[index] = day;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        setState({ ...state, appointments, days: days });
      });
  };



  
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(res => console.log(res))
    .then(() => {
      setState({
        ...state,
      })
    })
    .then(() => {
      spotCalculator(id);
    })
  };
  
  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;