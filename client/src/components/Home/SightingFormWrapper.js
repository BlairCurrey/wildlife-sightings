import { React, useState } from "react";

import SightingForm from './SightingForm.js';
import { 
    getFormValidationState, 
    formStateIsValid 
} from '../../utils/validators';
function SightingFormWrapper({
    animals,
    fetchSightings,
    validate,
    initialValues, 
    requestParams, 
    setResponse
}){
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = event => {
        // get values from form
        const { name, value: newValue, type } = event.target;
        // keep number fields as numbers
        const value = type === 'number' ? +newValue : newValue;
        // save field values and if they were touched
        setValues({ ...values, [name]: value, });
        setTouched({ ...touched, [name]: true,});
    };


    const handleBlur = event => {
        const { name, value} = event.target;
        // clear error
        const {[name]: removedError, ...rest } = errors;
        // check for new error
        const error = validate[name](value);
        // validate if field was touched
        setErrors({
            ...rest,
            ...(error && { [name]: touched[name] && error }),
        });
    };

    const request = async (values) => {
        try{
            const { url, options } = requestParams(values);
            let response = await fetch(url , options);
            return response
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // validate forms and update state
        const formValidationState = getFormValidationState(
                    values, validate, errors, touched);
        setErrors(formValidationState.errors);
        setTouched(formValidationState.touched);
        
        if(formStateIsValid(formValidationState, values)){
            let response = await request(values);
            setResponse(response);
            //if success status code clear form
            if(200 <= response.status && response.status < 300){
                setValues(initialValues);
                setErrors({});
                setTouched({});
                fetchSightings();
            }
        }
    };

    return(
        <div>
            <SightingForm
                animals={animals}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};
export default SightingFormWrapper;