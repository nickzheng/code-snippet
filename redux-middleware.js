const store = {
  init: 1
};

store.dispatch = (action) => {
  console.log('dispatch', action);
};

const logMiddleWare = (store)=> (next)=> (action)=> {
  console.log('store.init', store.init);
  console.log('start');
  next(action);
  console.log('end');
};


const logMiddleWare2 = store => next => action => {
  console.log('store.init', store.init);
  console.log('start2');
  next(action);
  console.log('end2');
};


const applyMiddleware = function(middleWares){
  const chain = middleWares.map(middleware => middleware(store));


  function compose(...chain) {
    if (chain.length === 0) {
      return arg => arg
    }

    if (chain.length === 1) {
      return chain[0]
    }

    return chain.reduce((pre, cur) => {
      return (...args) => {
        return pre(cur(...args));
      };
    })

  }
  store.dispatch = compose(...chain)(store.dispatch);
};



applyMiddleware([logMiddleWare,logMiddleWare2]);

store.dispatch(11111);
