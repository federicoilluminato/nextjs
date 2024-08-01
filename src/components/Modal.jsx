"use client"
import React from 'react'
import Input from './ui/input'

const Modal = ({setError, error, edit}) => {
    console.log("edit obj", edit)

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (           
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex justify-center items-center flex-col">
                <p className="text-red-500">{error}</p>
                {edit && (
                    <Input type="text" value={edit.downloadUrl} onChange={handleChange}/>
                )}
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setError(null)}> Close </button>
            </div>
        </div>
    )
}

export default Modal