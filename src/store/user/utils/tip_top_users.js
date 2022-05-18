import { store } from "../../index";
import actionsCreator from "../../actionsCreator";
import { SET_TIPTOP_USERS } from "../../matches/constants";
import { get_relevant_age_range } from "./index";
import {
  citiesNames,
  get_city_by_param,
} from "../../../views/registrationForm/cities";

export const genderHandler = (gender) => (gender === "male" ? "Man" : "Woman");
const get_location = (tip_top_location) => {
  const { city } = tip_top_location;
  return get_city_by_param(city, "eng_name");
};
export const generate_clilco_users = (profiles) =>
  profiles.map((profile) => ({
    name: profile.name,
    birthday: profile.answers?.birthday,
    imgUrl: {
      url: profile.imgUrl,
    },
    id: profile.answers?.id,
    city: get_location(profile.answers.location),
  }));

export const create_query = (clilcoUser) => {
  const { birthday, gender, wanted } = clilcoUser;
  const { minAge: ageTo, maxAge: ageFrom } = get_relevant_age_range({
    birthday,
    gender,
    wanted,
  });
  return {
    ageFrom,
    ageTo,
    nationality: clilcoUser.religion,
    group: null,
    hasNoChildren: false,
    location: null,
    notSmoking: null,
    religiousSector: undefined,
    status: undefined,
  };
};

export const myUser = (clilcoUser) => ({
  blackList: [],
  answers: {
    qualities: {
      gender: genderHandler(clilcoUser.gender),
    },
    location: {
      country: "Israel",
    },
    wanted: {
      gender: genderHandler(clilcoUser.wanted),
    },
  },
});

export const tip_top_users_getter = () => {
  return store.getState().matches.tip_top_users;
};

export const merge_tip_top_users = (users) => {
  return [...tip_top_users_getter(), ...users];
};

export const set_tip_top_users = (users) => {
  const all_users = merge_tip_top_users(users);
  actionsCreator(SET_TIPTOP_USERS, all_users);
};
