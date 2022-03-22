import {getFunctions, httpsCallable} from "firebase/functions"
const functions = getFunctions();

export const callAbleFunction = async (functionName,data) => {
const callable =  httpsCallable(functions, functionName)
return await callable(data)
}

