import {ContactInformation} from "../type";

import {store} from "./index";
import {update,deleteContact} from "./contact";

export const updateContactAction = (val: ContactInformation,id: string) => { // dispatch vao action update cua todoReducer
    const newValue = {
        ...val,
        key: id
    }
    return store.dispatch(update(newValue))
}

export const removeContactAction = (id: string) => { // dispatch vao action update cua todoReducer
    return store.dispatch(deleteContact(id))
}
