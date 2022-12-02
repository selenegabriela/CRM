import React from 'react'
import { Form, useLoaderData } from 'react-router-dom';
import NewCustomerForm from '../components/NewCustomerForm';
import { getCustomer } from '../data/customers';

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


const EditCustomer = () => {

    const customer = useLoaderData();
    console.log(customer)
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
    
            {/* {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)} */}
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

export default EditCustomer