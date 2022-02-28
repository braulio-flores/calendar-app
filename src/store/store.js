import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { calendarReducer } from "../reducers/calendarReducer";
import { uiReducer } from "../reducers/uiReducer";

const reducers = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

// ESTA ES TODA LA CONFIGURACION QUE DEBEMOS DE HACER PARA PODER TRABAJAR MIDDLEWARES Y DESPACHAR
// PETICIONES ASINCRONAS Y AL MISMO TIEMPO USAR LAS DEVTOOLS DE REDUX
