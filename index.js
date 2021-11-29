console.log('hello world')

let final = {dealers: []}

console.log(final);

async function main() {
  let datasetId = await fetch('http://api.coxauto-interview.com/api/datasetId')
    .then(response => response.json())
    .then(data => data.datasetId);

  let vehicles = await fetch(`http://api.coxauto-interview.com/api/${datasetId}/vehicles`)
    .then(response => response.json())
    .then(data => data.vehicleIds);

  let dealers = {}

  for (let i = 0; i<vehicles.length; i++) {
    let vehicleInfo = await fetch(`http://api.coxauto-interview.com/api/${datasetId}/vehicles/${vehicles[i]}`)
      .then(response => response.json())
      .then(data => data);
    if (!dealers[vehicleInfo.dealerId]) {
      let dealerInfo = await fetch(`http://api.coxauto-interview.com/api/${datasetId}/dealers/${vehicleInfo.dealerId}`)
        .then(response => response.json())
        .then(data => data);
      let dealerId = vehicleInfo.dealerId
      delete vehicleInfo.dealerId
      dealers[dealerId] = dealerInfo
      dealers[dealerId].vehicles = [vehicleInfo]
    } else {
      let dealerId = vehicleInfo.dealerId
      delete vehicleInfo.dealerId
      dealers[dealerId].vehicles.push(vehicleInfo);
    }
  }

  for (x in dealers) {
    final.dealers.push(dealers[x])
  }


  fetch(`http://api.coxauto-interview.com/api/${datasetId}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(final),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Success:', data);
      } else {
        console.error('Error:', data.message)
      }
      console.log(data.totalMilliseconds)

    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

main()
