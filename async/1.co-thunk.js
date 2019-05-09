import thunkify from 'thunkify';

const callback = function(url, callback) {
  setTimeout(() => {
    console.log('ajax url', url);
    callback(undefined, `userId-${Math.random()}`);
  }, 200);
};

// thunk
const getThunk = thunkify(callback);

function* main() {
  const userId = yield getThunk('/getUserId.json');
  return userId;
}


function 1(fn) {
  const gen = fn();

  function next(err, data) {
    const result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

1(main);
