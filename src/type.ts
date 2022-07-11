export interface ContactInformation {
    id: string;
    avatar?: any;
    value: string;
    firstName: string;
    lastName: string;
    company: string;
    phoneNumberList: Array<string>;
    emailList: Array<string>;
    addressList: Array<string>;
    birthday: string;
}
