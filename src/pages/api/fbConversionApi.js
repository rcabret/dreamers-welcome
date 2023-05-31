import axios from "axios";
export async function sendConversionEvent(eventData) {
  const access_token = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
  const pixelID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  const apiUrl = `https://graph.facebook.com/v17.0/${pixelID}/events`;
  try {
    const response = await axios.post(apiUrl, {
      data: [eventData],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
    });

    console.log(response.data); // Success response
  } catch (error) {
    console.error(error); // Error response
  }
}