
export default function auth(state = {}, action) {
    switch (action.type) {
        case "SOME_ACTION_NAME":
            return state = action.payload;
        default:
            return state;
    }
}
