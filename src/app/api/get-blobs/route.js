import { list } from '@vercel/blob';
 
export const runtime = 'edge';
 
export async function GET(request) {
    try{
        const { blobs } = await list();
        return Response.json(blobs);
    }
    catch(error){
        return new Response(JSON.stringify({ error: 'Failed to fetch blobs' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
    }
}