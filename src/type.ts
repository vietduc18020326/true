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
    key?: string;
}

export interface ContactDetailScreenProps {
    id?: string;
}

export interface CreateContactScreenProps extends ContactDetailScreenProps {
    item?: ContactInformation;
}
