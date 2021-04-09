function SignupForm({
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
            Username
            <input
                type="text"
                name="username"
                placeholder="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                required
            />
            <div className="invalidInput">{touched.username && errors.username}</div>
        </label>
        <label>
            Email
            <input
                type="email"
                name="email"
                placeholder="email@domain.com"
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

export default SignupForm;