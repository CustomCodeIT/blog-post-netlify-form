import {StringValueSelect} from "./select";

export type TheForm = {
    form_name: string;
    bot_field: string;
    first_name: string;
    last_name: string;
    email: string;
    favorite_colour: string;
    favorite_colour_select: StringValueSelect | null;
}