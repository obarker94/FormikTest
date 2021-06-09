import React, { Component } from 'react'
import { Form, Formik, useField } from "formik";
import { TextField } from "@material-ui/core";
import * as Yup from 'yup';

const CustomTextInput = ({ label, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ): null}
    </div>
  )
}

// const CustomCheckbox = ({ children, ...props}) => {
//   const [field, meta] = useField(props, 'checkbox');

//   return (
//     <div>
//       <label className="checkbox">{label}
//         <input type="checkbox" {...field} {...props} />
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ): null}
//     </div>
//   )
// }

const CustomSelect = ({ label, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ): null}
    </div>
  )
}



function App() {
  return (

      <Formik
        initialValues={{ 
          name: '',
          email: '',
          acceptedTerms: false,
          specialPower: ''
        }}
        validationSchema={Yup.object({
          name: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .max(15, 'Must be 15 char or less')
          .required('Required'),
          email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
          // acceptedTerms: Yup.boolean()
          //   .required('Required')
          //   .oneOf([true], 'You must accept the terms and conditions'),
          specialPower: Yup.string()
            .oneOf(['flight', 'invisibility', 'wealthy bat guy', 'other'], 'Invalid special power')
            .required('Required')
        })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              alert(JSON.stringify(values,null,2));
              resetForm();
              setSubmitting(false);
            }, 3000)
          }}
        >
          {props => (
            <Form>
              <h1>Sign Up</h1>
              <CustomTextInput label="Name" name="name" type="text" placeholder="frank" />
              <CustomTextInput label="Email" name="email" type="email" placeholder="frank@thetank.com" />
              <CustomSelect label="Special Power" name="specialPower">
                <option value="">Select a Special Power</option>
                <option value="flight">flight</option>
                <option value="invisibility">invisibility</option>
                <option value="wealthy bat guy">wealthy bat guy</option>
                <option value="other">other</option>
              </CustomSelect>
              {/* <CustomCheckbox name="acceptedTerms">
                I accept the terms and conditions
              </CustomCheckbox> */}
              <button type="submit">{props.isSubmitting ? 'Loading...' : 'Submit'}</button>
            </Form>
          )}
      </Formik>

  );
}

export default App;
