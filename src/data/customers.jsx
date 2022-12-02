export const getCustomers = async() => {

    const response = await fetch(import.meta.env.VITE_API_URL)
    const result = await response.json()

    return result
}

export const getCustomer = async(id) => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const result = await response.json()

    return result
}


export const postCustomer = async(data) => {

    try {
       const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
       })
       await response.json() 
    } catch (error) {
        
    }

}