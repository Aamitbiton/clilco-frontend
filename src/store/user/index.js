import USER_CONSTANTS from "./constants";

const {
  SET_USER_PRIVATE,
  SET_USER_PUBLIC,
  SET_LAST_DOC,
  SET_TEMP_USER,
  SET_IMAGE,
} = USER_CONSTANTS;

const userInterface = {
  user: {
    private: {},
    public: {},
  },
  temp_user: {},
  lastDoc: null,
};

export default function user(state = userInterface, action) {
  switch (action.type) {
    case SET_USER_PUBLIC:
      return {
        ...state,
        user: { public: action.payload, private: state.user.private },
      };
    case SET_USER_PRIVATE:
      return {
        ...state,
        user: { private: action.payload, public: state.user.public },
      };
    case SET_LAST_DOC:
      return { ...state, lastDoc: action.payload };
    case SET_TEMP_USER:
      return { ...state, temp_user: action.payload };
    case SET_IMAGE:
      return {
        ...state,
        user: {
          private: state.user.private,
          public: { ...state.user.public, imgUrl: action.payload },
        },
      };
    default:
      return state;
  }
}
