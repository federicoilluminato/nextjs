'use client';

import { useRef, useState } from "react";
import Input from "./ui/input";
import { upload } from '@vercel/blob/client';

export default function InputFile() {
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
    return (
      <>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const file = inputFileRef.current.files[0];
            const newBlob = await upload(file.name, file, {
              access: 'public',
              handleUploadUrl: '/api/upload',
            });
            setBlob(newBlob);
          }}
        >
          {/* <input name="file" ref={inputFileRef} type="file" required /> */}
          <Input type="file" required ref={inputFileRef}/>
          <button type="submit">Upload</button>
        </form>
        {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )}
      </>
  )
}