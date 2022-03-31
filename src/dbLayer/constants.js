export const dbPaths={
    users:'clilco_users',
    singleUser:{
        private:(uid)=>`clilco_users/${uid}/private/${uid}`,
        public:(uid)=>`clilco_users/${uid}/public/${uid}`,
    },
    rooms:'clilco_rooms',
    next_speed_date_time:'clilco_data_for_app/next_speed_date',
}