import React, { useEffect, useState } from "react";
import "./Users.scss";
import { f_get_all_users } from "../../../../store/user/userFunctions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppLoader from "../../../../components/AppLoader/AppLoader";

export const Users = ({ setLoader }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const [users, setUsers] = useState(null);
  const get_more_users = async () => {
    const newUsers = await f_get_all_users(!!users, true);
    if (newUsers) {
      const allUsers = users ? users.concat(newUsers) : newUsers;
      setUsers(allUsers);
      setLoader(false);
    }
  };
  const get_age = (birthday) => {
    let birthdate = new Date(birthday);
    let cur = new Date();
    let diff = cur - birthdate;
    return Math.floor(diff / 31557600000);
  };
  useEffect(() => {
    get_more_users();
  }, []);

  return users ? (
    <div className={"flex-center"}>
      <div className={"lobby-carousel-container"}>
        <Slider
          beforeChange={(oldIndex, newIndex) => {
            if (users.length - newIndex < 2) {
              get_more_users();
            }
          }}
          {...settings}
        >
          {users.map((user) => (
            <div className={"lobby-img-container"} key={user.id}>
              <img src={user.imgUrl?.url} />
              <div
                className={"lobby-details-container blur-background full-width"}
              >
                <p className={"details"}>
                  {user.name + "," + " " + get_age(user.birthday)}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  ) : (
    <>
      <AppLoader />
    </>
  );
};

// all props in here https://react-slick.neostack.com/docs/api/#pauseOnFocus
