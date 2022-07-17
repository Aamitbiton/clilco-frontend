import { get_relevant_age_range } from "../../store/user/utils";

export const dbPaths = {
  users: "clilco_users",
  singleUser: {
    private: (uid) => `clilco_users/${uid}/private/${uid}`,
    public: (uid) => `clilco_users/${uid}/public/${uid}`,
  },
  rooms: "clilco_rooms",
  singleRoom: (id) => `clilco_rooms/${id}`,
  next_speed_date_time: "clilco_data_for_app/next_speed_date",
  user_candidates: (type) => `${type}Candidates`,
  user_offers: "offers",
  users_left_room: "users_left_room",
};
export const basics_wheres = (user) => {
  const { maxAge, minAge } = get_relevant_age_range(user);
  return [
    { key: "imgUrl.id", operator: "==", value: "1" },
    { key: "gender", operator: "==", value: user.wanted },
    { key: "wanted", operator: "==", value: user.gender },
    { key: "birthday", operator: ">", value: minAge },
    { key: "birthday", operator: "<", value: maxAge },
  ];
};
