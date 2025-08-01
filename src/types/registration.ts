import { statuses } from "../constants/generic";

export type Registration = {
    name: string,
    email: string,
    phone: string,
    city: string | undefined,
    model: string | undefined,
    storage: string | undefined,
    color: string | undefined,
    interests: string,
    status: typeof statuses[number],
}

export type RegistrationDTO = Registration & {
    id: string | number,
    updated_at: string | null,
    created_at: string,
}