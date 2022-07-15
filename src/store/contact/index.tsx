import {createDynamicReducer} from '@/utils/createDynamicReducer';
// @ts-ignore
import {batch, useSelector} from 'react-redux';
import {ContactInformation} from '@/type';
import {AVATAR1} from '@/assets';

const initContact = {
  byKey: {
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

const {setStore, reducer, sync, useByKey, useKeysByQuery, setQueries} =
  createDynamicReducer<ContactInformation>('contacts', 'id', initContact);

export const setContactStore = setStore;
export const contactReducer = reducer;
export const useContact = useByKey;
export const useContactId = useKeysByQuery;
export const syncContact = sync;
export const setContactQueries = setQueries;

export const updateAllContacts = (
  contacts: ContactInformation[],
  ids: string[],
) => {
  let _ids: string[] = [...ids];

  for (let contact of contacts) {
    _ids.push(contact.id.toString());
  }

  _ids = [...new Set(_ids)];

  batch(() => {
    syncContact(contacts);
    setContactQueries({
      all: _ids,
    });
  });
};

export const useContactByKey = () => {
  return useSelector(state =>
    state.contacts.query['all'].map(key => ({
      key,
      value: state.contacts.byKey[key].value,
    })),
  );
};
