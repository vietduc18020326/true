import {createSlice, Store, PayloadAction} from '@reduxjs/toolkit';
import {ContactInformation} from '../../type';
import {useSelector} from 'react-redux';
import {AVATAR1} from '../../assets';

const initContact = {
  byId: {
    lCUTs2: {
      avatar: null,
      phoneNumberList: ['0931924', '09331348424', '0931924313', '09313244'],
      value: 'Lillie-Mai Allen',
      firstName: 'Allen',
      lastName: 'Lillie-Mai',
      company: '',
      birthday: '',
      emailList: ['cdabc@gmail.com'],
      addressList: [],
      id: 'lCUTs2',
    },
    TXdL0c: {
      avatar: AVATAR1,
      phoneNumberList: ['0931924'],
      value: 'Emmanuel Goldstein',
      firstName: '',
      lastName: '',
      company: '',
      birthday: '',
      emailList: [],
      addressList: [],
      id: 'TXdL0c',
    },
  },

  query: {
    all: ['lCUTs2', 'TXdL0c'],
  },
};

// let state ={
//     byId: {
//         "lCUTs2": {
//             avatar: null,
//             phoneNumberList: ['0931924','09331348424','0931924313','09313244'],
//             value: 'Lillie-Mai Allen',
//             firstName: 'Allen',
//             lastName: 'Lillie-Mai',
//             company: '',
//             birthday: '',
//             emailList: ['cdabc@gmail.com'],
//             addressList: [],
//             id: 'lCUTs2'
//         },
//         // ...
//     },
//     query: {
//         all: [ "lCUTs2", "TXdL0c", ],
//     }
// }
//
// const update = (state, payload: {item: ContactInformation}) => {
//     return {
//         ...state,
//         byId: {
//             ...state.byId,
//             [payload.item.id]: payload.item
//         },
//         query: {
//             all: [...new Set(Object.keys(state.byId))] // lay phan tu khac nhau
//         }
//     }
// }
//
// const delete = (state, payload: {id: string}) => {
//     const _all = [...state.query.all]
//     const removedQuery = _all.filter(id => payload.id !== id)
//
//     return {
//         ...state,
//         query: {
//             ...state.query,
//             all: removedQuery
//         }
//     }
// }
//
// const useItemById = (id: string) => {
//     return useSelector(state => state.byId[id])
// }

export const contactReducer = createSlice({
  // dinh nghia 1 cai reducer su dung createSlide
  name: 'contactReducer',
  initialState: initContact,
  reducers: {
    update: (state, payload: PayloadAction<ContactInformation>) => {
      const _byId = {
        ...state.byId,
        [payload.payload.id]: payload.payload,
      };

      return {
        ...state,
        byId: _byId,
        query: {
          all: [...new Set(Object.keys(_byId))],
        },
      };
    },
    deleteContact: (state, payload: PayloadAction<string>) => {
      const _all = [...state.query.all];
      const _byId = {...state.byId};
      const removedQuery = _all.filter(id => payload.payload !== id);
      if (payload.payload) {
        // @ts-ignore
        delete _byId[payload.payload];
      }

      return {
        ...state,
        byId: _byId,
        query: {
          ...state.query,
          all: removedQuery,
        },
      };
    },
  },
});

export const {update, deleteContact} = contactReducer.actions; // goi ra cac action cua contactReducer

let _store: Store | undefined;

// export const store = configureStore({ // khoi tao reducer
//     reducer: {
//         contactReducer: contactReducer.reducer
//     }
// })

export const constantSetStore = (store: Store) => {
  _store = store;
};

export const useContactIdList = (value?: string) => {
  // connect vao store de lay ra danh sach
  return useSelector((state: any) =>
    state.contacts.query.all.map((key: string) => ({
      key,
      value: state.contacts.byId[key].value,
    })),
  );
};

export const useContactById = (id: string) => {
  return useSelector((state: any) => state.contacts.byId[id]);
};

export const updateContactAction = (val: ContactInformation, id: string) => {
  // dispatch vao action update cua todoReducer
  const newValue = {
    ...val,
    key: id,
  };
  return _store && _store.dispatch(update(newValue));
};

export const removeContactAction = (id: string) => {
  // dispatch vao action update cua todoReducer
  return _store && _store.dispatch(deleteContact(id));
};
