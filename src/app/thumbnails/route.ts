import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function OPTIONS(request: Request) {
  return new Response('ok', {
    status: 200,
  });
}

export async function GET(request: Request) {
  return new Response('ok', {
    status: 200,
  });
}

export async function HEAD(request: Request) {
  return new Response('ok', {
    status: 200,
  });
}


export async function POST(request: Request) {
  const topic = (await request.json())['topic']
  if (!topic) return new Response('Invalid input', {status: 400})

  const props = {
    model: "dall-e-3",
    prompt: `
A small logo for ${topic}.

Using this color pallete: #ffffff, #FD7F7F, #746bd3, #d6ccff. Do not output color pallete sample.
Use #faf6ee as background color.

Big shapes.
No text.
Isometric
`,
    n: 1,
    size: "1024x1024",
    // style: 'natural'
  } as const

  const response = await openai.images.generate(props);
  console.log(response.data)
  const image_url = response.data[0].url;

  return new Response(JSON.stringify({image_url}), {
    status: 200,
  });
}
