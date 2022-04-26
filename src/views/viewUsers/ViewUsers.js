import React, { useEffect, useState } from "react";
import "./viewUsers.css";
import { f_get_all_users } from "../../store/user/userFunctions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ViewUsers = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: false,
  };
  const [users, setUsers] = useState(null);
  const get_more_users = async () => {
    const newUsers = await f_get_all_users();
    const allUsers = users ? users.concat(newUsers) : newUsers;
    setUsers(allUsers);
  };
  useEffect(() => {
    get_more_users();
  }, []);
  return users ? (
    <div className="carousel-container">
      <Slider
        beforeChange={(oldIndex, newIndex) => {
          if (users.length - newIndex < 2) get_more_users();
        }}
        {...settings}
      >
        {users.map((user) => (
          <div key={user.id}>
            <img src={user.imgUrl?.url} />
          </div>
        ))}
      </Slider>
    </div>
  ) : (
    <div>no users</div>
  );
};

// all props in here https://react-slick.neostack.com/docs/api/#pauseOnFocus
