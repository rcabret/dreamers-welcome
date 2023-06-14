import axios from 'axios';

export const sendPageViewEvent = async (pixelId, userData) => {
  try {
    const access_token = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
    const pixelID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;


    const response = await axios.post(
      `https://graph.facebook.com/v13.0/${pixelId}/events`,
      {
        data: [
          {
            event_name: 'PageView',
            event_time: Math.floor(Date.now() / 1000),
            user_data: userData,
          },
        ],
      },
      {
        params: {
          access_token: `${access_token}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
