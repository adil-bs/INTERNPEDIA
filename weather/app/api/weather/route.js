export async function GET(req) {
  try {
    const location = req.nextUrl.searchParams.get('location') || 'kochi'
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1h&timesteps=1d&apikey=s3DRFJmnz26Z4TFroRPOW6ef8XzGJymt`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    const res = await fetch(url, options)
    const data = await res.json()

    return new Response(JSON.stringify(data), {
        status: 200, headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.log("server side",error);
    return new Response(JSON.stringify({ message:"server error" }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

};