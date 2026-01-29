/*Forms - Controlled Components & Validation

Tasks:

Create state for email, password, confirmPassword
Create state for errors object
Make all inputs controlled (value + onChange)
Validate on submit:

Email has @ and .
Password >= 8 characters
Passwords match


Show error messages below each input
Clear form on successful submit

Key concepts: Controlled components, form validation, error handling
*/

import { useState } from 'react';

function RegistrationForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errors, setErrors] = useState({})
    // TODO: Create state for form fields
    // email, password, confirmPassword

    // TODO: Create state for errors object
    // { email: '', password: '', confirmPassword: '' }

    const validateEmail = (email) => {
        // TODO: Return true if email contains @ and .
        return email.includes('@') && email.includes('.');
    };

    const validatePassword = (password) => {
        // TODO: Return true if password length >= 8
        if (password.length >= 8) return true;
        return false;
    };

    const handleResetForm = () => {
        setPassword('')
        setPasswordConfirm('')
        setEmail('')
        setErrors({})

    }
    const handleSubmit = (e) => {

        const errors = {}
        e.preventDefault();

        if (validateEmail(email) && validatePassword(password) && password === passwordConfirm) {

            console.log(e.target);
            console.log(Object.fromEntries(e.target))
            console.log(new FormData(e.target));

            const formData = new FormData(e.target);  // Get form data from event
            const datashow = Object.fromEntries(formData); //need to name imput elements like name="email"

            //console.log(data);  // { email: '...', password: '...' }
            handleResetForm();

            console.log("registerd! ! !");

            const data = { email, password }
            fetch('hhtp://localhost:8888/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("succes", data)
                    handleResetForm();
                })
                .catch(err => {
                    console.log(err)
                })

            //TODO whats next 
            // send form make  post reqeust

        } else {

            console.log("errors");

            if (!validateEmail(email))
                errors.email = "Invalid email"
            setErrors({ ...errors, email: "Invalid email" })

            if (!validatePassword(password))
                errors.password = "password must be at least 8 characters";
            setErrors({ ...errors, password: "password must be at least 8 characters" })

            if (password !== passwordConfirm)
                errors.passwordconfirm = "passwords do not match";

            setErrors({ ...errors, passwordconfirm: "passwords do not match" })

            setErrors(errors)
        }

        // TODO: Validate all fields
        // Set errors if invalid
        // If all valid, console.log form data and clear form
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* TODO: Create controlled input for email */}
            {/* Show error message if errors.email exists */}

            <div id="email">
                <input
                    //type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                // TODO: Add value and onChange
                />
                {/* TODO: Show error */
                    errors.email
                }
            </div>

            <div id="password">
                <input
                    //  type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                // TODO: Add value and onChange
                />
                {/* TODO: Show error */
                    errors.password && <p style={{ color: 'red' }}>{errors.password};
                    </p>
                }
            </div>


            <div id="password">
                <input
                    //  type="password"
                    placeholder="password"
                    value={passwordConfirm}
                    onChange={(e) => { setPasswordConfirm(e.target.value) }}
                // TODO: Add value and onChange
                />
                {/* TODO: Show error */
                    errors.passwordconfirm}
            </div>

            {/* TODO: Create controlled inputs for password and confirmPassword */}
            {/* Validate: password >= 8 chars, passwords match */}

            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;