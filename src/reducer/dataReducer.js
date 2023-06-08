import { FETCH_DATA } from "../action/dataAction";

const initialValues = {};

const dataReducer = (state = initialValues, action) => {
    switch (action.type) {
        case FETCH_DATA: return action.payload
        default: return state
    }
}

export default dataReducer;