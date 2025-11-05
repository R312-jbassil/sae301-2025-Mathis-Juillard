// src/pages/api/generateGlasses.js
import { OpenAI } from 'openai';

const OR_TOKEN = import.meta.env.OR_TOKEN;
const OR_URL   = import.meta.env.OR_URL  || 'https://openrouter.ai/api/v1';
const OR_MODEL = import.meta.env.OR_MODEL || 'openai/gpt-oss-20b:free';

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const GET = () => json({ ok: true, hint: 'POST only' });

export const POST = async ({ request }) => {
  try {
    console.log('=== API generateGlasses called ===');
    console.log('OR_TOKEN:', OR_TOKEN ? 'Present (length: ' + OR_TOKEN.length + ')' : 'MISSING');
    console.log('OR_URL:', OR_URL);
    console.log('OR_MODEL:', OR_MODEL);
    
    if (!OR_TOKEN) {
      console.error('ERROR: OR_TOKEN is missing!');
      return json({ error: 'OR_TOKEN manquant' }, 500);
    }

    const body = await request.json();
    console.log('Body received:', body);
    
    // Compat : accepte soit un tableau de messages [{role,content}], soit {prompt:"..."}
    const messages = Array.isArray(body)
      ? body
      : (Array.isArray(body?.messages) ? body.messages
         : (body?.prompt ? [{ role: 'user', content: body.prompt }] : []));
    
    console.log('Messages to send:', messages);

    const systemMessage = {
      role: 'system',
      content:
        'You are an SVG code generator specialized in creating eyeglasses/sunglasses. ' +
        'Generate only raw SVG code for eyeglasses based on the user description. ' +
        'The SVG should be clean, modern, and well-structured with proper viewBox. ' +
        'Include ids for important parts like: frame-left, frame-right, bridge, temple-left, temple-right, lens-left, lens-right. ' +
        'Make sure the glasses are centered and proportional. Use elegant curves and paths. ' +
        'The SVG should be ready to use without any markdown formatting or explanations.',
    };

    const client = new OpenAI({
      baseURL: OR_URL,
      apiKey : OR_TOKEN,
    });

    console.log('Calling OpenAI API...');
    const resp = await client.chat.completions.create({
      model: OR_MODEL,
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 2048,
    });

    console.log('OpenAI response received');
    const content = resp.choices?.[0]?.message?.content ?? '';
    const match   = content.match(/<svg[\s\S]*?<\/svg>/i);
    const svg     = match ? match[0] : '';

    console.log('SVG extracted, length:', svg.length);
    return json({ svg: { role: 'assistant', content: svg } });
  } catch (e) {
    console.error('=== generateGlasses ERROR ===');
    console.error('Error type:', e.constructor.name);
    console.error('Error message:', e.message);
    console.error('Full error:', e);
    return json({ error: 'Erreur serveur generateGlasses: ' + e.message }, 500);
  }
};
