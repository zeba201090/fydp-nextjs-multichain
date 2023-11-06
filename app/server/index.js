// server/index.js
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors()); 
app.use(bodyParser.json());
const publishToMultiChain = require ('/blockchain/publishData.js');

app.use('/api', async (req, res) => {
  if (req.method === 'POST') {
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
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
