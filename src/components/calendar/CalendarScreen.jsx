import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import NavBar from "../ui/NavBar";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";

import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../actions/ui";
import { eventClearActive, eventSetActive } from "../../actions/event";
import AddNewFab from "../ui/AddNewFab";
import DeletEventFfab from "../ui/DeletEventFfab";

const localizer = momentLocalizer(moment);
// const events = [
//   {
//     title: "Interview",
//     start: moment().toDate(),
//     end: moment().add(2, "hours").toDate(),
//     bgcolor: "#847655",
//     notes: "React Interview",
//     user: {
//       _id: 123,
//       name: "Braulio",
//     },
//   },
// ];

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const calendar = useSelector(state=>state.calendar);
  const { events, activeEvent } = calendar;

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log(event, start, end, isSelected);
    const style = {
      backgroundColor: "#000000",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    console.log(event);
    dispatch(openModal());
  };

  const onSelectEvent = (event) => {
    dispatch(eventSetActive(event));
  };

  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  }

  const onSelectSlot = (event) =>{
    dispatch(eventClearActive());
  }

  return (
    <div className="calendar-screen">
      <NavBar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        // messages=''
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot} //PARA CUANDO SE DESELECCIONA
        selectable={true}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <CalendarModal />
      <AddNewFab />
      {
        activeEvent && <DeletEventFfab />
      }      
    </div>
  );
};

export default CalendarScreen;
