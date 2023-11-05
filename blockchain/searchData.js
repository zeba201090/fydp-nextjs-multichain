import request from 'request-promise';

console.log('Searching for patient data...');
function searchData() {
    console.log('searching inside function');
    const requestOptions = {
        method: 'POST',
        uri: 'http://localhost:2672',
        auth: {
            user: 'multichainrpc',
            pass: '2m3xemSbnMMo1oe4ZpExkrX9egKhS4tMwJ4urwWTUs54',
        },
        body: {
            method: 'liststreamitems',
            params: ['stream1'],
        },
        json: true,
    };

    request(requestOptions)
        .then(response => {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                const items = response.result;
                
                // items.map(item => {
                    const firstItem = items[0]; // Access the first item in the array
                    const jsonData = firstItem.data.json;
                    console.log('Patient Data (First Item):', jsonData);
                    
                // });

                return items;
            }
        })
        .catch(error => {
            console.error('Failed to retrieve stream items:', error.message);
        });


}


export default searchData;
