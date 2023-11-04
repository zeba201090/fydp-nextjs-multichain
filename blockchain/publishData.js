const request = require('request-promise');

const rpchost = '127.0.0.1';
const rpcport = 2672;
const rpcuser = 'multichainrpc';
const rpcpassword = '2m3xemSbnMMo1oe4ZpExkrX9egKhS4tMwJ4urwWTUs54';

const streamName = 'stream1';
const key = 'key1';



async function publishToMultiChain() {
    const requestOptions = {
        method: 'POST',
        uri: `http://${rpchost}:${rpcport}`,
        auth: {
            user: rpcuser,
            pass: rpcpassword,
        },
        body: {
            method: 'publish',
            params: [streamName, kek, data],
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

async function main() {
    try {
        const transId = await publishToMultiChain();

        console.log('Medical record stored on blockchain --- Transaction ID:', transId);
    } catch (error) {
        console.error('Failed to publish:', error);
    }
}

main();


