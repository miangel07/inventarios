export enum StatusGeneric {
    active = "active",
    inactive = "inactive"
}

export const FieldsGeneric = (fiels: string): { message: string } => {
    const data = {
        message: `El ${fiels} es obligatorio`
    }
    return data
}