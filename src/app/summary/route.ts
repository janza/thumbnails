import OpenAI from "openai";

export const maxDuration = 60;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function OPTIONS(request: Request) {
  return new Response('', {
    status: 200,
  });
}

export async function GET(request: Request) {
  return new Response('', {
    status: 200,
  });
}


export async function HEAD(request: Request) {
  return new Response('', {
    status: 200,
  });
}


export async function POST(request: Request) {
  const items = (await request.json())
  if (!items || !items.length) return new Response('Invalid input', {status: 400})
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
        prompt: `
Summarize the list of ideas below that were presented on a whiteboard in a few words. Only output the generic words:
- ${items.join('-\n')}
`,
    max_tokens: 7,
    temperature: 0.1,
  });

  return new Response(response.choices[0].text, {
    status: 200,
  });
}
