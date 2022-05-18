import * as Yup from "yup";

export const theFormValidator = Yup.object().shape({

    first_name: Yup.string()
        .required("First name is required"),

    last_name: Yup.string()
        .required("Last name is required."),

    email: Yup.string()
        .nullable(true)
        .email('Invalid email.')
        .transform((v, o) => o === '' ? null : v)
        .required("Email is required."),

    favorite_colour_select: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
    })
        .nullable(true)
        .required("Favorite colour is required."),
});