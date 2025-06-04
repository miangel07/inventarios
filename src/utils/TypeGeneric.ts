export enum StatusGeneric {
    active = "active",
    inactive = "inactive"
}

export const FieldsGeneric = (fiels: string, isNull?: string): { message: string } => {
    const data = {
        message: `${isNull ? isNull : 'El'} ${fiels} es obligatorio`
    }
    return data
}