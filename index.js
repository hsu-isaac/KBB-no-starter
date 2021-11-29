console.log('hello world')

let datasetId = ''

fetch('http://api.coxauto-interview.com/api/datasetId')
  .then(response => response.json())
  .then(data => datasetId = data);

fetch(`http://api.coxauto-interview.com/${datasetId}/answer`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(datasetId),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
