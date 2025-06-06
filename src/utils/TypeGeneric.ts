export enum StatusGeneric {
    active = "active",
    inactive = "inactive"
}
export const ObjetGenericStatus = (): {
    type: "enum";
    enum: typeof StatusGeneric;
    default: StatusGeneric;
} => {
    return {
        type: "enum",
        enum: StatusGeneric,
        default: StatusGeneric.active
    };
};

export const FieldsGeneric = (fiels: string, isNull?: string): { message: string } => {
    const data = {
        message: `${isNull ? isNull : 'El'} ${fiels} es obligatorio`
    }
    return data
}