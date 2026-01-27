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
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: Validate all fields
        // Set errors if invalid
        // If all valid, console.log form data and clear form
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* TODO: Create controlled input for email */}
            {/* Show error message if errors.email exists */}

            <div>
                <input
                    type="email"
                    placeholder="Email"
                // TODO: Add value and onChange
                />
                {/* TODO: Show error */}
            </div>

            {/* TODO: Create controlled inputs for password and confirmPassword */}
            {/* Validate: password >= 8 chars, passwords match */}

            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;