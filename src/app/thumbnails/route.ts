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
A simple logo for the topic: ${topic}.

Using this color pallete: #faf6ee, #ffffff, rgb(253, 127, 127), #746bd3, #d6ccff. Do not output color pallete sample.

It's very important to use simple lines and for the illustratio to not have a lot of detail.
Do not output any text.

The image has a slight isometric perspective, giving it a three-dimensional appearance while maintaining its illustrative flatness. There's a sense of whimsy in the drawing, with attention to the functional aspects, but not adhering strictly to realistic proportions or details.
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
