import Millis from '@millisai/web-sdk';

const millisClient = Millis.createClient({
  publicKey: import.meta.env.VITE_MILLIS_PUBLIC_KEY,
  endPoint: import.meta.env.VITE_MILLIS_ENDPOINT
});

export const startMillisAgent = async (metadata = {}, includeMetadataInPrompt = true) => {
  try {
    await millisClient.start({
      agent: {
        agent_id: import.meta.env.VITE_MILLIS_AGENT_ID,
        agent_config: {}
      },
      metadata,
      include_metadata_in_prompt: includeMetadataInPrompt
    });
  } catch (error) {
    console.error('Error starting Millis agent:', error);
    throw error;
  }
};

export const stopMillisAgent = async () => {
  try {
    await millisClient.stop();
  } catch (error) {
    console.error('Error stopping Millis agent:', error);
    throw error;
  }
};

export default millisClient;