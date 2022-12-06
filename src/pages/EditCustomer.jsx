import React from 'react'
import { Form, useActionData, useLoaderData, useNavigate, redirect } from 'react-router-dom';
import NewCustomerForm from '../components/NewCustomerForm';
import { getCustomer, putCustomer } from '../data/customers';
import Error from '../components/Error';

export const loader = async({params: {id}}) => {

    const customer = await getCustomer(id)
    if(!Object.keys(customer).length){
        throw new Response('', {
            status: 404,
            statusText: 'Customer Not Found'
        })
    }
    return customer;
};

export const action = async({request, params: {id}}) => {
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
  
    await putCustomer(id, data)
    
    return redirect('/')

}


const EditCustomer = () => {

    const navigate = useNavigate();

    const customer = useLoaderData();
    const errors = useActionData();
 
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Edit Customer</h1>
            <p className='mt-3'>You can modify the data of a customer</p>
    
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
                <NewCustomerForm customer={customer}/>
    
                <input 
                type="submit"
                className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                value='Keep Changes'
                />
            </Form>
            </div>
        </>
    )
}

export default EditCustomer