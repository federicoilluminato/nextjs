'use client';

import { useRef, useState } from "react";
import Input from "./ui/input";
import { upload } from '@vercel/blob/client';
import { Table } from "./ui/table";
import { BlobsTable } from "./BlobsTable";

export default function InputFile() {
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
    const [error, setError] = useState(null); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputFileRef.current.files[0]) {
            setError('No file selected');
            return;
        }   
        const file = inputFileRef.current.files[0];
        console.log("file size", (file.size / (1024 * 1024)).toFixed(2), "mb")

        if (file.size > 5 * 1024 * 1024) { // 5MB in bytes
            setError('File size exceeds 5MB');
            return;
        }
        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
            });
            setError(null); 
        } catch (uploadError) {
            setError('Upload failed');
            console.error('Upload error:', uploadError);
        } finally {
            const response = await fetch('/api/get-blobs');
            if (!response.ok) {
                setError(`error getblobs: ${response.status}`);
            }
            const data = await response.json();
            console.log("response getblobs", data)
            setBlob(data);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input type="file" ref={inputFileRef} />
                <button type="submit">Upload</button>
            </form>
            {error && (             
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex justify-center items-center flex-col">
                    <p className="text-red-500">{error}</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setError(null)}> Close </button>
                </div>
            </div>
            )}
            {blob && (
                <BlobsTable invoices={blob}/>
                // aca hay que iterar sobre los blobs, y por cada uno hacer un componente, con los botones que piden, quizas tengan que ser del lado del servidor
            )}
        </>
    );
}
