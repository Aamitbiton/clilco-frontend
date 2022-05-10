import React, { useEffect, useState } from "react";
import "./viewUsers.scss";
import { f_get_all_users } from "../../store/user/userFunctions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Header } from "../home/components/header/header";
import Title from "../../components/title/title";
import { useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AppStack from "../../components/AppStack";

export const ViewUsers = () => {
  const isMobile = useSelector((state) => state.app.isMobile);
  const swipeAnimation = require("../../assets/swipe_3.gif");
  const loadingGiff = require("../../assets/loading.gif");
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: false,
    arrows: !isMobile,
  };
  const [users, setUsers] = useState(null);
  const [view_animation, set_view_animation] = useState(true);
  const get_more_users = async () => {
    const newUsers = await f_get_all_users(!!users);
    const allUsers = users ? users.concat(newUsers) : newUsers;
    setUsers(allUsers);
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
      <Header />
      {view_animation && (
        <img
          className="gif-swipe-animation"
          src={swipeAnimation}
          onAnimationEnd={() => {
            set_view_animation(false);
          }}
        />
      )}

      <div className={"carousel-container"}>
        <Slider
          beforeChange={(oldIndex, newIndex) => {
            if (view_animation) set_view_animation(false);
            if (users.length - newIndex < 2) get_more_users();
          }}
          {...settings}
        >
          {users.map((user) => (
            <div className={"img-container"} key={user.id}>
              <img src={user.imgUrl?.url} />
              <div className={"details-container blur-background full-width"}>
                <p className={"details"}>
                  {user.name + "," + " " + get_age(user.birthday)}
                </p>
                <AppStack direction={"row"}>
                  <LocationOnIcon
                    className={"details-icon"}
                    fontSize={"inherit"}
                    color={"secondary"}
                  />
                  <p className={"details"}>{user.city.name}</p>
                </AppStack>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  ) : (
    <div className={"flex-center"}>
      <img src={loadingGiff} className="loading-giff"></img>
    </div>
  );
};

// all props in here https://react-slick.neostack.com/docs/api/#pauseOnFocus
