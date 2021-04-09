import React from 'react';

function LoginForm({
    values, 
    errors, 
    touched, 
    handleChange,
    handleBlur,
    handleSubmit
}){
    return(
        <form onSubmit={handleSubmit}>
        <label>
            Email
            <input
                type="email"
                name="email"
                placeholder="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
            />
            <div className="invalidInput">{touched.email && errors.email}</div>
        </label>
        <label>
            Password
            <input
                type="password"
                name="password"
                placeholder="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
            />
            <div className="invalidInput">{touched.password && errors.password}</div>
        </label>
        <input type="submit" value="Submit" />
        </form>
    )
}

export default LoginForm;