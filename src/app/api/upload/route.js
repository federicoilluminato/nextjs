import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
    const body = await request.json();
  
    try {
      const jsonResponse = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async (pathname) => {
        // Notify third-party API that upload is starting
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.
          try {
            await fetch('https://example.com/upload-starting', {
              method: 'POST',
              body: JSON.stringify({ blobUrl: blob.url }),
              headers: { 'Content-Type': 'application/json' },
            });
          } catch (error) {
            console.error('Error notifying starting:', error);
          }
          return {
            allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
            tokenPayload: JSON.stringify({
              // Additional payload if needed
            }),
          };
        },
        onUploadCompleted: async ({ blob, tokenPayload }) => {
          try {
            // Notify third-party API about successful upload
            await fetch('https://example.com/upload-success', {
              method: 'POST',
              body: JSON.stringify({ blobUrl: blob.url }),
              headers: { 'Content-Type': 'application/json' },
            });
          } catch (error) {
            console.error('Error notifying success:', error);
          }
        },
        onUploadFailed: async (error) => {
          try {
            // Notify third-party API about failed upload
            await fetch('https://example.com/upload-failure', {
              method: 'POST',
              body: JSON.stringify({ error: error.message }),
              headers: { 'Content-Type': 'application/json' },
            });
          } catch (error) {
            console.error('Error notifying failure:', error);
          }
        },
      });
  
      return NextResponse.json(jsonResponse);
    } catch (error) {
      return NextResponse.json(
        { error: (error).message },
        { status: 400 }
      );
    }
  }