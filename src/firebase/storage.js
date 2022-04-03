import { App } from "./app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
  listAll,
  deleteObject,
} from "firebase/storage";
import { errorLog } from "../utils/logs";

const storage = getStorage(App);
async function uploadImgAsString({ image, path }) {
  const storageRef = ref(storage, path);
  try {
    return await uploadString(storageRef, image, "data_url");
  } catch (e) {
    errorLog(e);
  }
}

// async function uploadFile(file, path) {
//   const userId = JSON.parse(localStorage.getItem(LS_USER)).uid;
//   const fileRef = ref(storage, userId + "/" + path);
//   const snapshot = await uploadBytes(fileRef, file)
//   return await getDownloadURL(snapshot.ref)
// }

async function getImg(userId, counter) {
  return getDownloadURL(ref(storage, userId + "/" + counter));
}

export async function getCurrentVideoQuestion(lang, section, question) {
  return getDownloadURL(
    ref(storage, `videoQuestions/${lang}/${section}/${question}.mp3`)
  );
}

// async function uploadTest(recording, user) {
//   const storageRef = Storage.ref(`${user.answers.id}`);
//   const mountainsRef = storageRef.child('voiceMatchesAudio');
//   return mountainsRef.put(recording)
//     .then(async snapshot => {
//       const downloadURL = await snapshot.ref.getDownloadURL();
//       console.log(`successfully voice matches uploaded recording to user ${user.name}`);
//       return downloadURL
//     });
// }

export async function getVoiceMatchesAudio() {
  let list = await listAll(ref(storage, `voiceMatchesAudio`));
  let array = [];
  for (let item of list.items) {
    let finallyItem = await getDownloadURL(ref(item));
    array.push(finallyItem);
  }
  return array;
}

export default {
  uploadImgAsString,
  getImg,
  // uploadFile,
  getVoiceMatchesAudio,
};
