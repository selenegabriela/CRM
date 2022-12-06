import React from 'react'
import { useNavigate, redirect, Form } from 'react-router-dom'
import { deleteCustomer } from '../data/customers'

export const action = async({params: {id}}) => {
    await deleteCustomer(id);

    return redirect('/')
}

const Customer = ({customer}) => {

    const navigate = useNavigate()

    const { name, company, email, phone, id } = customer
    return (
        <tr className='border-b'>
            <td className="p-6">
                <p className='text-2xl'>{name}</p>
                <p>{company}</p>
            </td>
            <td className='p-6'>
                <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
                <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>Phone: </span>{phone}</p>
            </td>
            <td className='p-6 flex gap-3'>
                <button
                    onClick={() => navigate(`/customers/${id}/edit`)}
                    type='button'
                    className='text-blue-600 hover:text-blue-700 uppercase font-bold text-xs'
                >
                    Edit
                </button>
                <Form
                    method='post'
                    action={`/customers/${id}/destroy`}
                    onSubmit={e => {
                        if(!confirm('Are you sure?')){
                            e.preventDefault()
                        }
                    }}
                >
                    <button
                        type='submit'
                        className='text-red-600 hover:text-red-700 uppercase font-bold text-xs'
                    >
                        Delete
                    </button>
                </Form>
            </td>
        </tr>
    )
}

export default Customer