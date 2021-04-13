import React from 'react';
import Button from '@material-ui/core/Button'

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
        <Button type="submit" variant="contained" color="primary">Login</Button>
        </form>
    )
}

export default LoginForm;