import co from 'co';
import thunkify from 'thunkify';


const callback = function(url, callback) {
  setTimeout(() => {
    console.log('ajax url', url);
    callback(undefined, `userId-${Math.random()}`);
  }, 200);
};

// thunk
const getThunk = thunkify(callback);

// promise
const getUserProfile = function (url, id) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log('ajax url', url);
      resolve(`id-${id}-userProfile-${Math.random()}`);
    },200);
  })
};


const getBalances = function (url, userProfile) {
  return new Promise(function (resolve) {
    console.log('start getBalances');
    setTimeout(() => {
      console.log('ajax url', url);
      console.log('start end');
      resolve(`userProfile-${userProfile}-balance-${Math.random()}`);
    },200);
  })
};

// Generator
function* getGenerator(url, userProfile) {
  console.log('getGenerator start');
  const result =  yield getBalances(url, userProfile);
  console.log('getGenerator end');
  return result;
}

function* main() {
  const userId = yield getThunk('/getUserId.json');
  console.log('userId', userId);
  const userProfile = yield getUserProfile('/userProfile.json', userId);
  console.log('userProfile', userProfile);
  const balance = yield getGenerator('/balance.json', userProfile);
  return balance;
}

co(main())
  .then((balance) => {
    console.log('balance', balance);
  })
  .catch((err) => {
    console.log('err', err);
  });

