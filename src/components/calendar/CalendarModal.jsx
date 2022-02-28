import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { closeModalAction } from "../../actions/ui";
import {
  eventAddNew,
  eventClearActive,
  eventUpdated,
} from "../../actions/event";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const startDateInicial = moment();
const finishDdateInicial = moment(startDateInicial).add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: startDateInicial.toDate(),
  end: finishDdateInicial.toDate(),
};


// INICIO DEL FUNCIONA COMPONENT

const CalendarModal = () => {
  const dispatch = useDispatch();

  const { activeEvent } = useSelector((state) => state.calendar);

  const { modalOpen } = useSelector((state) => state.ui);

  const [startDate, setStartDate] = useState( activeEvent?.start || startDateInicial.toDate());
  const [finishDate, setFinishDate] = useState(activeEvent?.end || finishDdateInicial.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);


  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    }else{
      setFormValues(initEvent);
    }
  }, [activeEvent]);

  const handleChange = (e) => {
    setFormValues((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };

  const { title, notes, start, end } = formValues;

  const closeModal = () => {
    dispatch(closeModalAction());
    dispatch(eventClearActive());
  };

  const handleChangeStartDate = (e) => {
    setStartDate(e);
    setFormValues((state) => {
      return {
        ...state,
        start: e,
      };
    });
  };

  const handleChangeFinishDate = (e) => {
    setFinishDate(e);
    setFormValues((state) => {
      return {
        ...state,
        end: e,
      };
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Second date must be mayorer than first.",
      });
      return;
    }
    if (title.trim().length < 1) {
      return setTitleValid(false);
    }

    setTitleValid(true);

    // TODO SETEO A LA BASE DE DATOS
    if (activeEvent) {
      dispatch(eventUpdated({
        ...activeEvent,
        ...formValues 
      }));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
        })
      );
    }

    setFormValues(initEvent);

    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {activeEvent ? 'Editar' : 'Nuevo'} evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <br />
          {/* <input className="form-control" placeholder="Fecha inicio" /> */}
          <DateTimePicker
            onChange={handleChangeStartDate}
            value={startDate}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleChangeFinishDate}
            value={finishDate}
            className="form-control"
            minDate={startDate}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
