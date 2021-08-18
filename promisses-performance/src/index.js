const Request = require('./request');
const request = new Request();

async function schedule() {
  console.log('Starting in ...', new Date().toISOString());

  const requests = [
    { url: 'https://www.mercadobitcoin.net/api/BTC/ticker/'},
    { url: 'https://www.naoexiste.net/'},
    { url: 'https://www.mercadobitcoin.net/api/BTC/orderbook/'},
  ]
  .map((data) => ({
    ...data,
    timeout: 2000,
    method: 'get'
  }))
  .map((params) => request.makeRequest(params));

  const result = await Promise.allSettled(requests);

  const allSucceeded = [];
  const allFailed = [];

  for(const { status, value, reason } of  result) {
    if (status === 'rejected') {
      allFailed.push(reason);

      continue;
    }

    allSucceeded.push(value);
  }

  const serializedData = JSON.stringify(allSucceeded);

  console.log(
    allFailed,
    serializedData,
  );
}

const PERIOD = 2000;

setInterval(schedule, PERIOD);