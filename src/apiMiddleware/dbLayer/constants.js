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
export const basics_wheres = (user) => [
  { key: "imgUrl", operator: "!=", value: null },
  { key: "gender", operator: "==", value: user.wanted },
  { key: "wanted", operator: "==", value: user.gender },
];
