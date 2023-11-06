const request = require('request-promise');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 8000;

const rpchost = '127.0.0.1';
const rpcport = 2672;
const rpcuser = 'multichainrpc';
const rpcpassword = '2m3xemSbnMMo1oe4ZpExkrX9egKhS4tMwJ4urwWTUs54';

const streamName = 'stream1';
const key = 'key1';

app.use(cors());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
app.use(bodyParser.json());

app.get('/get', async (req, res) => {
    const requestOptions = {
        method: 'POST',
        uri: `http://${rpchost}:${rpcport}`,
        auth: {
            user: rpcuser,
            pass: rpcpassword,
        },
        body: {
            method: 'liststreamitems',
            params: [streamName],
        },
        json: true,
    };
    
    request(requestOptions)
        .then(response => {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                const items = response.result;

    
                items.map(item => {
                    const jsonData = item.data.json;
                    console.log('Patient Data:', jsonData);
                });
                res.send(items);
            }
                
        })
        .catch(error => {
            console.error('Failed to retrieve stream items:', error.message);
        });
});



app.post('/post', async (req, res) => {

    // const data = { 'json' : { name: 'rocholi'  }};
    const data = { 'json': req.body };

    
    
    const requestOptions = {
                method: 'POST',
                uri: `http://${rpchost}:${rpcport}`,
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
                const resultData = response.result;
                console.log(response)
                res.send(resultData);

            } catch (error) {
                throw error;
            }
        
        

});


// async function publishToMultiChain() {
//     const requestOptions = {
//         method: 'POST',
//         uri: `http://${rpchost}:${rpcport}`,
//         auth: {
//             user: rpcuser,
//             pass: rpcpassword,
//         },
//         body: {
//             method: 'publish',
//             params: [streamName, kek, data],
//         },
//         json: true,
//     };

//     try {
//         const response = await request(requestOptions);
//         const transId = response.result;
        
//         return transId;
//     } catch (error) {
//         throw error;
//     }
// }

// async function main() {
//     try {
//         const transId = await publishToMultiChain();

//         console.log('Medical record stored on blockchain --- Transaction ID:', transId);
//     } catch (error) {
//         console.error('Failed to publish:', error);
//     }
// }

// main();


