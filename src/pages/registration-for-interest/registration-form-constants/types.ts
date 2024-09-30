export type registrationForm = {
    name ?: string,
    email ?: string,
    phone ?: string,
    city ?: string | undefined,
    model ?: string | undefined,
    storage ?: string | undefined,
    color ?: string | undefined,
    interests ?: Array<string>
}

export type dynamicOption = {
    label: string,
    show: boolean,
}

export type selectOption = {
    label: string,
    value: string,
}