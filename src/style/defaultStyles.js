import { store } from "../store";
const { getState } = store;
const isMobile = window.innerWidth <= 450;

export default {
  inputs: {
    LARGE_INPUT_WIDTH: isMobile ? 270 : 650,
    MED_INPUT_WIDTH: isMobile ? 125 : 300,
    SMALL_INPUT_WIDTH: isMobile ? 80 : 150,
    STATIC_WIDTH: 270,
    STATIC_HEIGHT: 50,
  },
  header: {
    HEIGHT: isMobile ? 70 : 90,
  },
  icons: {
    DEFAULT_LARGE_SIZE: 90,
  },
};
