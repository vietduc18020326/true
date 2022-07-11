import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit'
import {ContactInformation} from "../type";
import {useSelector} from "react-redux";
import {IMAGES} from "../assets";

const initTodo: ContactInformation[] = [
    { avatar: null, phoneNumberList: ['0931924','09331348424','0931924313','09313244'], value: 'Lillie-Mai Allen', firstName: 'Allen', lastName: 'Lillie-Mai', company: '', birthday: '', emailList: ['cdabc@gmail.com'], addressList: [], id: 'lCUTs2' },
    { avatar: IMAGES.avatar1, phoneNumberList: ['0931924'], value: 'Emmanuel Goldstein', firstName: '', lastName: '', company: '', birthday: '',emailList: [], addressList: [], id: 'TXdL0c' },
    {  avatar: IMAGES.avatar1, phoneNumberList: ['0931924'], value: 'Winston Smith', firstName: '', lastName: '', company: '', birthday: '',emailList: [], addressList: [], id: 'zqsiEw' },
    {  avatar: IMAGES.avatar1, phoneNumberList: ['0931924'], value: 'William Blazkowicz', firstName: '', lastName: '', company: '', birthday: '',emailList: [], addressList: [], id: 'psg2PM' },
    {  avatar: IMAGES.avatar1, phoneNumberList: ['0931924'], value: 'Gordon Comstock', firstName: '', lastName: '', company: '', birthday: '',emailList: [], addressList: [], id: '1K6I18' },
    {  avatar: IMAGES.avatar1, phoneNumberList: ['0931924'], value: 'Philip Ravelston', firstName: '', lastName: '', company: '', birthday: '',emailList: [], addressList: [], id: 'NVHSkA' },
    {  avatar: IMAGES.avatar1, phoneNumberList: ['0931924'], value: 'Rosemary Waterlow', firstName: '', lastName: '', company: '', birthday: '',emailList: [], addressList: [], id: 'SaHqyG' },
    {  avatar: IMAGES.avatar1, phoneNumberList: ['0931924'], value: 'Julia Comstock', firstName: '', lastName: '', company: '', birthday: '',emailList: [], addressList: [], id: 'iaT1Ex' },
    {  avatar: IMAGES.avatar1, phoneNumberList: ['0931924'], value: 'Mihai Maldonado', firstName: '', lastName: '', company: '', birthday: '',emailList: [], addressList: [], id: 'OvMd5e' },
    {  avatar: IMAGES.avatar1, phoneNumberList: ['0931924'], value: 'Murtaza Molina', firstName: '', lastName: '', company: '', birthday: '',emailList: [], addressList: [], id: '25zqAO' },
    {  avatar: IMAGES.avatar1, phoneNumberList: ['0931924'], value: 'Peter Petigrew', firstName: '', lastName: '', company: '', birthday: '',emailList: [], addressList: [], id: '8cWuu3' },
]

export const contactReducer = createSlice({ // dinh nghia 1 cai reducer su dung createSlide
    name: 'contactReducer',
    initialState: initTodo,
    reducers: {
        update: (state, payload: PayloadAction<ContactInformation>) => {
            // const _arr = [...state];
            // const _index = _arr.findIndex(item => item.id === payload.payload.id)
            // if (_index > -1) {
            //     _arr[_index] = payload.payload;
            //     return _arr
            // }
            return [...state, payload.payload]
        },
        deleteContact: (state, payload: PayloadAction<ContactInformation>) => {
            return state.filter(item => item.id !== payload.payload.id)
        }
    }
})

export const {update, deleteContact} = contactReducer.actions // goi ra cac action cua todoReducer

// export const store = configureStore({ // khoi tao reducer
//     reducer: {
//         contactReducer: contactReducer.reducer
//     }
// })

export const useContactList = () => { // connect vao store de lay ra danh sach todo
    return useSelector((state: any) => {
        const array = Object.keys(state).map((key) => {
            if (key !== '_persist') {
                return {key, value: state[key].value}
            }
        });
        array.pop();
        return array;
    })
}

export const useContact = (id: string) => {
    // const list = useContactList();
    // const _index = list.findIndex((item: any) => item.id === id)
    return useSelector((state: any) => state[id]);
}
