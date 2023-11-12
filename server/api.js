// server/api.js
const http = require('http');
const request = require('request-promise');

const port = 8000;

const rpchost = '127.0.0.1';
const rpcport = 2672;
const rpcuser = 'multichainrpc';
const rpcpassword = '2m3xemSbnMMo1oe4ZpExkrX9egKhS4tMwJ4urwWTUs54';

const streamName = 'stream1';
const key = 'key1';

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/get') {
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
                    res.end(JSON.stringify(items));
                }
            })
            .catch(error => {
                console.error('Failed to retrieve stream items:', error.message);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            });
    } else if (req.method === 'POST' && req.url === '/post') {
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

        request(requestOptions)
            .then(response => {
                const resultData = response.result;
                console.log(response);
                res.end(JSON.stringify(resultData));
            })
            .catch(error => {
                console.error('Failed to publish:', error.message);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
