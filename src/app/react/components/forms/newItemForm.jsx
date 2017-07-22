import React from 'react'
import {Field, reduxForm} from 'redux-form'

const NewItemForm = props => {
  const {handleSubmit, pristine, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Item Name</label>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Item Name"
          />
        </div>
      </div>
      <div>
        <label>Attribute A</label>
        <div>
          <Field
            name="a"
            component="input"
            type="text"
            placeholder="Attribute A"
          />
        </div>
      </div>
      <div>
        <label>Attribute B</label>
        <div>
          <Field
            name="b"
            component="input"
            type="text"
            placeholder="Attribute B"
          />
        </div>
      </div>      
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'NewItemForm' // a unique identifier for this form
})(NewItemForm)
