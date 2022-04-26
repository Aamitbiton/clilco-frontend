const MOBILE_SCREEN_MAX_WIDTH = 550;
const isMobile = window.screen.width < MOBILE_SCREEN_MAX_WIDTH;

export default {
  inputs: {
    LARGE_INPUT_WIDTH: isMobile ? 270 : 650,
    MED_INPUT_WIDTH: isMobile ? 125 : 300,
    SMALL_INPUT_WIDTH: isMobile ? 80 : 150,
    STATIC_WIDTH: 270,
  },
  header: {
    HEIGHT: isMobile ? 70 : 90,
  },
};
