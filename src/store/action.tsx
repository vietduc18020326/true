import {ContactInformation} from "../type";

import {store} from "./configureStore";
import {update,deleteContact} from "./index";

export const updateContactAction = (val: ContactInformation) => { // dispatch vao action update cua todoReducer
    return store.dispatch(update(val))
}

export const removeContactAction = (val: ContactInformation) => { // dispatch vao action update cua todoReducer
    return store.dispatch(deleteContact(val))
}
