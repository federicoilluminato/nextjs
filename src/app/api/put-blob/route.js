import { put } from '@vercel/blob';
 
export async function PUT(request) {
    try{
        const form = await request.formData();
        const file = form.get('file');
        const blob = await put(file.name, file, { access: 'public' });
        return new Response(JSON.stringify({ success: true, blob: blob }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch(error){
        return new Response(JSON.stringify({ error: 'Failed to update blob' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}