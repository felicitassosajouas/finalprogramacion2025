

export type UserFront = {
    fullname: string,
    email: string,
    password: string
}

export type RegisterForm = Pick< UserFront, 'fullname' |'email'> & {
    dni: string,
    phone: string,
    password: string,
    password_confirmation: string
}

export type LoginForm = Pick<UserFront, 'email'> & {
    password: string
}















