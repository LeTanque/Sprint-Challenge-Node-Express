export default function reducer(state, action) {
    switch(action.type) {
        case "GET_PROJECTS":
            return {
                ...state, 
                projects: action.payload.projects
            }
 
        default:
            return state
    }
}