const { processFile, filterCustomers } = require('./nearbyCustomers');
const customerList = process.argv[2];

processFile(customerList)
  .then(res => {
    filterCustomers(res);
  })
  .catch(err => {
    console.error(err);
  });
