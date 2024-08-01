"use client"
import React, { useState } from 'react'
import Input from './ui/input'

const Modal = ({setError, error, edit}) => {
    const [inputValue, setInputValue] = useState(edit || '');
    console.log("edit obj", edit)

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSave = async () => {
        try {
          const response = await fetch('/api/edit-item', { 
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pathname: inputValue }), 
          });
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
                    <Input type="text" value={edit.pathname} onChange={handleChange}/>
                )}
                <div className='flex'>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setError(null)}> Close </button>
                    {edit && <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSave()}> Save </button>}
                </div>
            </div>
        </div>
    )
}

export default Modal