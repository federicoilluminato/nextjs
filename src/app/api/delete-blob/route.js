import { del } from '@vercel/blob';
 
export async function DELETE(request) {
  try{
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get('url');
    await del(urlToDelete);
    }
    catch(error){
        return new Response(JSON.stringify({ error: 'Failed to delete blob' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}