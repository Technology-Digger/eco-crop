
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall } = await req.json()

    // Simple crop prediction logic
    const crops = ['rice', 'wheat', 'corn', 'potato', 'soybean']
    const randomCrop = crops[Math.floor(Math.random() * crops.length)]

    return new Response(
      JSON.stringify({ crop: randomCrop }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
