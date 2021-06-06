
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';


const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 2) {
    errors.name = 'Minimum be 2 characters or more'
  }
  if (!values.preparation_time) {
    errors.preparation_time = 'Required'
  } 
  if (!values.type) {
    errors.type = 'Required'
  }
  if (!values.no_of_slices && values.type === 'pizza') {
    errors.no_of_slices = 'Required'
  } else if (isNaN(Number(values.no_of_slices)) && values.type === 'pizza') {
    errors.no_of_slices = 'Must be a number'
  }
  if (!values.diameter && values.type === 'pizza') {
    errors.diameter = 'Required'
  } 
  if (!values.spiciness_scale && values.type === 'soup') {
    errors.spiciness_scale = 'Required'
  }    
  if (!values.slices_of_bread && values.type === 'sandwich') {
    errors.slices_of_bread = 'Required'
  } else if (isNaN(Number(values.slices_of_bread)) && values.type === 'sandwich') {
    errors.slices_of_bread = 'Must be a number'
  }
  return errors
}

const renderField = ({ input, label, type, step, meta: { touched, error, warning } }) => (
  <div>
    <label className="control-label">{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control" step={step} />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
  <div>
    <label>{label}</label>
    <div>
      <select {...input} className="form-control">
        {children}
      </select>
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
)

let FormCode = props => {
  const { selectedDish, handleSubmit, pristine, reset, submitting } = props;
  const mySelectOptions = [{value: '', text: ''},{value: 'pizza', text: 'Pizza'},{value: 'soup', text: 'Soup'},{value: 'sandwich', text: 'Sandwich'}];
  return (
    <form className="m-5 px-5" onSubmit={ handleSubmit }>
      <div className="form-group">
        <Field name="name" component={renderField} label="Dish Name" />
      </div>
      <div className="form-group">
        <Field name="preparation_time" component={renderField} label="Preparation Time" type="time" step="1" />
      </div>
      <div className="form-group">
        <Field name="type" component={renderSelectField} label="Dish Type">
          { mySelectOptions.map(option => <option value={option.value}>{option.text}</option>) }
        </Field>
      </div>
      {(selectedDish && selectedDish==='pizza' && (
        <div>
          <div className="form-group">
            <Field name="no_of_slices" component={renderField} label="Number of slices" type="number" parse={value => Number(value)} />
          </div>
          <div className="form-group">
            <Field name="diameter" component={renderField} label="Diameter" type="number" step="0.1" parse={value => Number(value)} />
          </div>
        </div>
        )) ||
        (selectedDish && selectedDish==='soup' && (
          <div className="form-group">
            <Field name="spiciness_scale" component={renderField} label="Spiciness scale" type="number" step="1" min="1" max="10" parse={value => Number(value)} />
          </div>
        )) ||
        (selectedDish && selectedDish==='sandwich' && (
          <div className="form-group">
            <Field name="slices_of_bread" component={renderField} label="Number of slices of bread" type="number" parse={value => Number(value)} />
          </div>
        ))
      }

      <div className="form-group">
        <button type="submit" disabled={pristine || submitting} className="btn btn-primary">Submit</button>           
        <button type="button" disabled={pristine || submitting} className="btn btn-danger" onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}
FormCode = reduxForm({
  form: 'dish',
  validate,
})(FormCode);

const selector = formValueSelector('dish')
FormCode = connect(state => {
  const selectedDish = selector(state, 'type')
  return {
    selectedDish
  }
})(FormCode)

export default FormCode;