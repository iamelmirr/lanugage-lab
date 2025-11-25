// API utility to call OpenAI through Netlify serverless function
const API_ENDPOINT = import.meta.env.DEV 
  ? '/.netlify/functions/chat'  // Local Netlify CLI
  : '/.netlify/functions/chat'; // Production (relative URL works on Netlify)

export async function callOpenAI(messages, model = 'gpt-3.5-turbo') {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}
