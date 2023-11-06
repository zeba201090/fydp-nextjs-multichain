

async function publishToMultiChain(streamName, key, data) {
    const request = require('request-promise');
    const rpchost = '127.0.0.1';
    const rpcport = 2672;
    const rpcuser = 'multichainrpc';
    const rpcpassword = '2m3xemSbnMMo1oe4ZpExkrX9egKhS4tMwJ4urwWTUs54';

    const requestOptions = {
        method: 'POST',
        
        uri: `http://localhost:2672`,
        auth: {
            user: rpcuser,
            pass: rpcpassword,
        },
        body: {
            method: 'publish',
            params: [streamName, key, data],
        },
        json: true,
    };

    try {
        const response = await request(requestOptions);
        const transId = response.result;
        
        return transId;
    } catch (error) {
        throw error;
    }
}

export default publishToMultiChain;
