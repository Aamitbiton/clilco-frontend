import React, { useEffect, useState } from "react";
import "./viewUsers.css";
import { f_get_all_users } from "../../store/user/userFunctions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Header } from "../home/components/header/header";
import Title from "../../components/title/title";
import { useSelector } from "react-redux";
import swipeAnimation from "../../assets/swipe_3.gif";

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
              <Title
                className={"view-users-title blur-background"}
                title={user.name + "," + user.city.name}
                color={"white"}
                fontSize={25}
              />
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
