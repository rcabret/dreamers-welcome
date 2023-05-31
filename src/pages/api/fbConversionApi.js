import axios from "axios";
export async function sendConversionEvent(eventData) {
  const access_token = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
  const pixelID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  const apiUrl = `https://graph.facebook.com/v16.0/${pixelID}/events?access_token=${access_token}`;
  try {
    const response = await axios.post(apiUrl, {
      data: [eventData],
    });

    console.log(response.data); // Success response
  } catch (error) {
    console.error(error); // Error response
  }
}