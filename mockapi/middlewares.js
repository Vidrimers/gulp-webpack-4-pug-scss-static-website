// const test2 = require('./routes/test-2.js');

module.exports = (req, res, next) => {
  // if (req.originalUrl.includes('/test')) {
    
  //   // POST
  //   if (req.body.test === 0) {
  //     res.jsonp({
  //       status: true
  //     });
  //     return;
  //   }

  //   // GET
  //   // req.query;

  //   // from file
  // test2(params, res);


  //   res.jsonp({
  //     status: false
  //   });
  //   return;
  // }
  next();
};
