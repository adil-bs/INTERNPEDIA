export type auth = 'login' | 'signup'
export interface authInputs {
    email: string
    pass: string
    confirmPass?: string
    uname?: string
}
export interface authPageData<type> {
    login: type
    signup: type
}