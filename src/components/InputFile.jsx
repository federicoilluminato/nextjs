'use client';

import { useRef, useState } from "react";
import Input from "./ui/input";
import { upload } from '@vercel/blob/client';
import { BlobsTable } from "./BlobsTable";
import Modal from "./Modal";

export default function InputFile() {
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
    const [error, setError] = useState(null); 

    const fetchBlobs = async () => {
        const response = await fetch('/api/get-blobs');
        if (!response.ok) {
            setError(`error getblobs: ${response.status}`);
        }
        const data = await response.json();
        console.log("response getblobs", data)
        setBlob(data);
    };

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
            fetchBlobs()
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input type="file" ref={inputFileRef} />
                <button type="submit" className="justify-self-center">Upload</button>
            </form>
            {error && (             
                <Modal setError={setError} error={error}/>
            )}
            {blob?.length > 0 && (
                <BlobsTable data={blob} setBlob={setBlob} fetchBlobs={fetchBlobs}/>
            )}
        </>
    );
}
