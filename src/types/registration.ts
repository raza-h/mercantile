import { statuses } from "../constants/generic";
import { PTA_STATUSES } from "../pages/registration-for-interest/registration-form-constants";

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
    pta_status: typeof PTA_STATUSES[number],
}

export type RegistrationDTO = Registration & {
    id: string | number,
    updated_at: string | null,
    created_at: string,
}