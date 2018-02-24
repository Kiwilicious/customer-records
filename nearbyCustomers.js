function processFile(file) {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const readline = require('readline');
    const input = fs.createReadStream(file);
    const rl = readline.createInterface(input);
    const customers = [];

    rl.on('line', (line) => {
      let customer;
      try {
        customer = JSON.parse(line);
      }
      catch(error) {
        reject(error);
      }
      customers.push(customer);
    });

    rl.on('close', () => {
      resolve(customers);
    })
  })
}

function filterCustomers(customers) {
  const dublin = { latitude: "53.339428", longitude: "-6.257664" };
  dublin.latitude= degreeToRadian(dublin.latitude);
  dublin.longitude = degreeToRadian(dublin.longitude);

  customers.map(customer => {
    customer.latitude = degreeToRadian(customer.latitude);
    customer.longitude = degreeToRadian(customer.longitude);
  })
  const within100Kilos = customers.filter(customer => {
    const distance = findDistance(dublin.latitude, dublin.longitude, customer.latitude, customer.longitude);
    if (distance < 100) { return true; }
  })
  within100Kilos.sort((a, b) => {
    return a.user_id - b.user_id;
  });

  printCustomers(within100Kilos);
}

function printCustomers(filtered) {
  for (let i = 0; i < filtered.length; i++) {
    const name = filtered[i].name.padEnd(20);
    const id = filtered[i].user_id;
    console.log(`${name} ${id}`);
  };
}

function degreeToRadian(deg) {
  return deg * Math.PI / 180;
}

function findDistance(lat1, long1, lat2, long2) {
  const earthRadius = 6378.137;
  const deltaLong = Math.abs(long1 - long2);
  const centralAngle = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(deltaLong));
  const arcLength = earthRadius * centralAngle;
  return arcLength;
}

module.exports = {
  processFile,
  filterCustomers,
  printCustomers,
  degreeToRadian,
  findDistance,
};
