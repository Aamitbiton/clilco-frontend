import actionsCreator from "../actionsCreator";
import * as videoService from "../../services/video";
import { store } from "../index";
import VIDEO_CONSTANTS from "./constants";
import { set_user_available } from "../user/userFunctions";
import { webRTCConfiguration } from "../../views/videoDate/videoUtils";
import { send_candidate } from "../../services/video";

const pc = new RTCPeerConnection(webRTCConfiguration);

const { getState, dispatch } = store;

export const watch_room = async () => {
  await videoService.watch_room(async (room) => {
    if (room) await actionsCreator(VIDEO_CONSTANTS.SET_ROOM, room);
    //todo: if there is room - start video
    // after date consider to delete the room or add parameter to stop listening
    // maybe user the rooms as יומן שיחות

    // dont forget to stop watching rooms if not available
  });
};

export const get_next_speed_date_time = async () => {
  const time = await videoService.get_next_speed_date_time();
  if (time?.milliseconds)
    await actionsCreator(
      VIDEO_CONSTANTS.SET_SPEED_DATE_TIME,
      time.milliseconds
    );
};

export const go_available = async () => {
  await watch_room();
  await set_user_available();
};

export const handle_room_update = async () => {
  const room = getState().video.room;
  const myId = getState().user.user.private.id;
  const otherUserId = room?.userIds?.find((id) => id != myId);
  await actionsCreator(VIDEO_CONSTANTS.SET_DATE_STARTED, true);
  if (room) {
    const myData = room[myId];
    const otherUserData = room[otherUserId];

    if (!myData || !myData.offer) await send_my_data();

    if (!pc.currentRemoteDescription && otherUserData?.offer) {
      await accept_other_user_offer(otherUserData.offer);
    }

    if (otherUserData?.candidate) {
      await accept_other_user_candidate(otherUserData.candidate);
    }
  }
};

export const send_my_data = async () => {
  const roomId = getState().video.room.id;
  await send_candidate_on_create(roomId);
  await create_offer(roomId);
};

const create_offer = async (roomId) => {
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);
  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };
  await videoService.send_offer({ offer, roomId });
};
const send_candidate_on_create = async (roomId) => {
  pc.onicecandidate = async (event) => {
    event.candidate &&
      (await videoService.send_candidate({
        candidate: event.candidate.toJSON(),
        roomId,
      }));
  };
};
const accept_other_user_offer = async (offer) => {
  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  console.log(pc.currentRemoteDescription);
  debugger;
};
const accept_other_user_candidate = async (candidateData) => {
  const candidate = new RTCIceCandidate(candidateData);
  await pc.addIceCandidate(candidate);
};

//https://github.com/fireship-io/webrtc-firebase-demo/blob/main/main.js
//https://www.youtube.com/watch?v=WmR9IMUD_CY
