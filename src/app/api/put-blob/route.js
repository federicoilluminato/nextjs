import { put } from '@vercel/blob';
 
export async function PUT(request) {
    try{
        const form = await request.formData();
        const file = form.get('file');
        const blob = await put(file.name, file, { access: 'public' });
        console.log('blob', blob)
        return new Response(JSON.stringify({ success: true, blob }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch(error){
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}