import React from "react";
import Image from "../../../components/Image";
import Typography from "@mui/material/Typography";
import CenterLayout from "../../../components/CenterLayout";
import AppStack from "../../../components/AppStack";
import AppButton from "../../../components/Buttons/AppButton";
import { useTheme } from "@mui/material";

function RestoreTiptopUser({ user, closeModal, acceptIntegration }) {
  return (
    <CenterLayout direction={"column"}>
      <Logos />
      <AppStack margin={1}>
        <img className={"my-profile-image"} src={user.imgUrl.url} />
      </AppStack>
      <Typography>שלום {user.name}!</Typography>
      <Typography>זהינו שיש לך משתמש באפליקצית Tiptop Match</Typography>
      <Typography align={"center"}>
        האם אתה מעוניין לקחת משם את פרטיך ולקצר את תהליך ההרשמה?
      </Typography>
      <Typography fontSize={12}>פרטיך האישיים ניתנים לעריכה בכל עת.</Typography>
      <ButtonsSection
        acceptIntegration={acceptIntegration}
        closeModal={closeModal}
      />
    </CenterLayout>
  );
}

const Logos = () => {
  const IMAGE_DIMENSIONS = 100;
  return (
    <AppStack spacing={7} margin={3}>
      <Image
        height={IMAGE_DIMENSIONS}
        width={IMAGE_DIMENSIONS}
        src={require("../../../assets/clilco_logo.png")}
      />
      <Image
        height={IMAGE_DIMENSIONS}
        width={IMAGE_DIMENSIONS}
        src={require("../../../assets/tip_top_logo.png")}
      />
    </AppStack>
  );
};

const ButtonsSection = ({ closeModal, acceptIntegration }) => {
  const palette = useTheme().palette;
  const secondary = palette.secondary.main;
  return (
    <AppStack margin={3} spacing={3}>
      <AppButton
        onClick={acceptIntegration}
        fontWeight={"thin"}
        label={"כן אני מעונין"}
      />
      <AppButton
        fontWeight={"bold"}
        labelColor={secondary}
        borderColor={secondary}
        onClick={closeModal}
        label={"לא מעונין"}
      />
    </AppStack>
  );
};

export default RestoreTiptopUser;
