'use client';

import { useEffect, useRef, useState } from "react";
import Input from "./ui/input";
import { upload } from '@vercel/blob/client';
import { BlobsTable } from "./BlobsTable";
import Modal from "./Modal";
import { Button } from "./ui/button";

export default function InputFile() {
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 


    const fetchBlobs = async () => {
        const response = await fetch('/api/get-blobs');
        if (!response.ok) {
            setError(`error getblobs: ${response.status}`);
        }
        const data = await response.json();
        console.log("response getblobs", data)
        setBlob(data);
        localStorage.setItem('blobData', JSON.stringify(data));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
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
            setLoading(false)
        }
    };

    useEffect(() => {
        const storedBlobData = localStorage.getItem('blobData');
        if (storedBlobData) {
            setBlob(JSON.parse(storedBlobData));
        }
    }, []);
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <Input type="file" ref={inputFileRef} />
                <Button type="submit" className="justify-self-center">Upload</Button>
            </form>
            {error && (             
                <Modal setError={setError} error={error}/>
            )}
            {blob?.length > 0 && (
                <BlobsTable data={blob} setBlob={setBlob} fetchBlobs={fetchBlobs} loading={loading}/>
            )}
        </>
    );
}
