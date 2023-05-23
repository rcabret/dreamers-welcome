import axios from 'axios';


export async function sendConversionEvent(eventData) {
  const access_token = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
  const pixelID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const apiUrl = `https://graph.facebook.com/v14.0/${pixelID}/events`;

  try {
    const response = await axios.post(apiUrl, eventData, {
      params: { access_token },
    });
    console.log('Conversion event sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending conversion event:', error);
  }
}