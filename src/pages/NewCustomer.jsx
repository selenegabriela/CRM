import React from 'react'
import NewCustomerForm from '../components/NewCustomerForm'
import Error from '../components/Error'
import { Form, redirect, useActionData, useNavigate } from 'react-router-dom'
import { postCustomer } from '../data/customers'

export const action = async({request}) => {
  const formData = await request.formData();

  // Acces formData values:
  const data = Object.fromEntries(formData)

  const emailFormData = formData.get('email')

  // Validation

  const errors = []
  if(Object.values(data).includes('')){
    errors.push('All fields are required')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(emailFormData)) {
    errors.push('Invalid email')
  }

  if(Object.keys(errors).length){
    return errors
  }

  await postCustomer(data)
  
  return redirect('/')
}

const NewCustomer = () => {

  const navigate = useNavigate();
  const errors = useActionData()

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>New Customer</h1>
      <p className='mt-3'>Fill up all fields to register a new customer</p>

      <div className='flex justify-end'>
        <button
        onClick={() => navigate(-1)}
          className='bg-blue-800 text-white px-3 py1 font-bold uppercase'
        >
          Volver
        </button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mxauto px-5 py-10 mt-20'>

        {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form
           method='post'
        >
          <NewCustomerForm />

          <input 
            type="submit"
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
            value='Register Customer'
          />
        </Form>
      </div>
    </>
  )
}

export default NewCustomer