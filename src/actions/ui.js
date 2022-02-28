import { types } from "../types/types";

export const openModal = () => {
  return {
    type: types.uiOpenModal,
  };
};

export const closeModalAction = () => {
  return {
    type: types.uiCloseModal,
  };
};
