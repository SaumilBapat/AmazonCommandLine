let promise1 = new Promise(function (resolve, reject) {
  setTimeout(function(done) {
    resolve("Finished 2000 timeout");
  }, 2000);
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Finished 1000 timeout');
  }, 1000);
});

promise1.then((response) => {
  console.log(response);
  promise2.then((response2) => {
    console.log(response2);
  })
});
