import moment from "moment";
import { types } from "../types/types";

const inicialState = {
  events: [
    {
      id: new Date().getTime(),
      title: "Interview",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      bgcolor: "#847655",
      notes: "React Interview",
      user: {
        _id: 123,
        name: "Braulio",
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = inicialState, action) => {
  switch (action.type) {
    case types.eventAddNew:
      return {
        ...state,
        events: [
          ...state.events,
          {
            ...action.payload,
            user: {
              _id: 123,
              name: "Braulio",
            },
          },
        ],
      };
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null,
      };
    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter((e) =>
          e.id !== state.activeEvent.id
        ),
        activeEvent: null
      };

    default:
      return state;
  }
};
