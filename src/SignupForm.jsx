/*
Exercise: useForm Custom Hook
Build a reusable useForm hook that handles validation, then use it in a SignupForm component.
The hook useForm should:

Accept an initialValues object and a validate function
Track values, errors, and touched fields
Return values, errors, touched, handleChange, handleBlur, handleSubmit, and isValid

The SignupForm component:

Fields: username, email, password
Show error messages only for touched fields (don't yell at users before they type)
Disable submit button when form is invalid
On valid submit, log the values
*/

import { useState, useCallback, useEffect } from "react";

function useForm(initialValues, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});


    useEffect(() => {

        //running validate here?

    }, [values])

    const handleChange = useCallback((e) => {
        // update values, re-run validate

        const { name, value } = e.target;

        setValues((prev) => ({ ...prev, [name]: value }))


        setErrors(validate({ ...values, [name]: value }))
    }, [values, validate]
    );

    const handleBlur = (e) => {

        // console.log(e.target)
        const { name } = e.target;
        setTouched({ ...touched, [name]: true })  //better ((prev)=>({...prev, [name]: true}))
        // mark field as touched
    };

    const handleSubmit = (onSubmit) => (e) => {
        e.preventDefault();

        setTouched({ ...touched, username: true, email: true, password: true })

        let newerrors = validate(values)
        //console.log(newerrors)
        setErrors(newerrors)
        if (Object.keys(newerrors).length > 0 ? false : true) {
            onSubmit(values);
            console.log("LOGGIN VALUES SUBMIT", values)

        }
        // preventDefault, touch all fields, validate
        // if no errors, call onSubmit(values)
    };

    const isValid = (Object.keys(errors).length > 0 ? false : true) && values.username !== ''// derived from errors //TODO
    console.log("is it validate", isValid)
    //console.log(Object.keys(errors).length)
    //console.log(isValid)
    //console.log("about to return", values)

    return { values, errors, touched, handleChange, handleBlur, handleSubmit, isValid };
}

const validate = (values) => {
    const errors = {};
    console.log("ABOUT TO VALIDATE")

    if (!values.username || values.username.length < 3) {
        errors.username = " required, min 3 chars"
    }
    if (!values.email.includes("@")) {
        errors.email = " must include @"
    }
    if (values.password.length < 6) {
        errors.password = " required, min 6 chars"
    }
    // username: required, min 3 chars
    // email: required, must include @
    // password: required, min 6 chars
    return errors;
};

export default function SignupForm() {
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isValid } =
        useForm({ username: '', email: '', password: '' }, validate);

    console.log(values)

    return (
        <div>
            {/* 3 inputs using handleChange, handleBlur */}
            {/* show errors only when touched */}
            {/* submit button disabled={!isValid} */}
            <form onSubmit={handleSubmit((values) => console.log("Submitted!", values))}>


                <input name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
                {errors.username && touched.username && <p>{errors.username}</p>}
                <input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                {errors.email && touched.email && <p>{errors.email}</p>}
                <input name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                {errors.password && touched.password && <p>{errors.password}</p>}

                <button type="submit" disabled={!isValid}>Submit</button>

            </form>
        </div >
    );
}