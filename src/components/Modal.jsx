"use client"
import React, { useState } from 'react'
import Input from './ui/input'

const Modal = ({setError, error, edit}) => {
    const [inputValue, setInputValue] = useState(edit?.pathname || '');

    const handleChange = (event) => {
        console.log('Input value:', event.target.value);
        setInputValue(event.target.value);
    };

    const handleSave = async () => {
        try {
          const response = await fetch('/api/put-blob', { 
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...edit, pathname: inputValue }), 
          });
          console.log('uploading this', { ...edit, pathname: inputValue })
          const data = await response.json();
          console.log('put request response:', data);
        } catch (error) {
            console.log('error', error)
        }
      };

    return (           
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex justify-center items-center flex-col">
                <p className="text-red-500">{error}</p>
                {edit && (
                    <Input type="text" value={inputValue} onChange={handleChange}/>
                )}
                <div className='flex'>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mx-1" onClick={() => setError(null)}> Close </button>
                    {edit && <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mx-1" onClick={() => handleSave()}> Save </button>}
                </div>
            </div>
        </div>
    )
}

export default Modal