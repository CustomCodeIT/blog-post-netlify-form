import styles from "./the-form.module.scss";
import {NextPage} from "next";
import {yupResolver} from "@hookform/resolvers/yup";
import {theFormValidator} from "../../validation/the-form";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import {TheForm} from "../../types/the-form";
import {ErrorMessage} from "@hookform/error-message";
import {StringValueSelect} from "../../types/select";

type Props = {};

const TheForm:NextPage<Props> = (props) => {

    const options:StringValueSelect[] = [
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'orange', label: 'Orange' },
    ];

    const { control, register, reset, handleSubmit, formState: { errors } } = useForm<TheForm>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(theFormValidator),
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true,
        defaultValues: {
            favorite_colour_select: null,
        }
    });

    function onSubmit(form:TheForm)
    {
        const formDetails = {
            "form-name": form.form_name,
            "bot-field": form.bot_field,
            "first-name": form.first_name,
            "last-name": form.last_name,
            "email": form.email,
            "favorite-colour": form.favorite_colour_select?.value ?? '',
        }

        const data = new URLSearchParams(formDetails).toString();

        fetch("/", {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(() => {
                reset();
                alert("FORM SUBMITTED!")
            })
            .catch((error) => {
                alert("ERROR SUBMITTING FORM! CHECK CONSOLE");
                console.error(error)
            });
        console.log(form);
    }

    return (
        <form name="contact" onSubmit={handleSubmit(onSubmit)} data-netlify={true} data-netlify-honeypot={"bot_field"} className={styles.form}>

            <input type="hidden" value="contact" {...register("form_name")} />

            <div className={styles.formGroupHidden}>
                <label htmlFor="bot_field" >Are you a bot?</label>
                <input {...register("bot_field")} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="first_name" >First Name</label>
                <input {...register("first_name")}/>
                <span className={styles.formError}><ErrorMessage name={"first_name"} errors={errors} /></span>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="last_name" >Last Name</label>
                <input {...register("last_name")}/>
                <span className={styles.formError}><ErrorMessage name={"last_name"} errors={errors} /></span>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email" >Email</label>
                <input type="email" {...register("email")}/>
                <span className={styles.formError}><ErrorMessage name={"email"} errors={errors} /></span>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="favorite_colour_select" >Favorite Colour</label>
                <Controller
                    name={'favorite_colour_select'}
                    control={control}
                    render={({field: {value, onChange}}) => <Select
                        id={"favorite_colour_select"}
                        instanceId={"favorite_colour_select"}
                        placeholder={"Pick your favorite colour..."}
                        isClearable={true}
                        options={options}
                        value={value}
                        onChange={onChange}
                    />}
                />
                <span className={styles.formError}><ErrorMessage name={"favorite_colour_select"} errors={errors} /></span>
            </div>

            <div className={styles.formControls}>
                <input type={"submit"} value={"Submit"}/>
            </div>
        </form>
    );
};

export default TheForm;