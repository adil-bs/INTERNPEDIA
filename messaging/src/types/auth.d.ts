export type auth = 'login' | 'signup'
export interface authInputs {
    uname: string
    email: string
    pass: string
    confirmPass?: string
}
export interface authPageData<type> {
    login: type
    signup: type
}