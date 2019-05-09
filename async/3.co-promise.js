
// promise
const getUserProfile = function (url, id) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log('ajax url', url);
      resolve(`id-${id}-userProfile-${Math.random()}`);
    },200);
  })
};

function* main() {
  const userProfile = yield getUserProfile('/userProfile1.json', 123);
  const userProfile2 = yield getUserProfile('/userProfile2.json', userProfile);
  return userProfile2;
}

function runPromise(gen) {
  return new Promise((resolve) => {
    const g = gen();
    function next(data) {
      const result = g.next(data);
      if(result.done) {
        return resolve(result.value);
      }
      result.value.then(function(data){
        next(data);
      });

    }
    next();
  });
}
