// api/multichain.js
import {publishToMultiChain} from '/blockchain/publishData.js'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received request:', req.body);
    const { streamName, key, data } = req.body;

    try {
      const transId = await publishToMultiChain(streamName, key, data);
      console.log('Published to MultiChain:', transId);
      res.status(200).json({ success: true, transactionId: transId });
    } catch (error) {
      console.error('Failed to publish:', error);
      res.status(500).json({ error: 'Failed to publish data to MultiChain' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
