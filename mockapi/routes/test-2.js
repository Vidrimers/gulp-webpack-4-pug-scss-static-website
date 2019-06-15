
module.exports = function (params, res) {
  const test = [
    {
      id: 1,
      title: 'test 2'
    },
    {
      id: 2,
      title: 'test 2'
    },
  ];

  const testResponse = test.slice(0, 1);

  res.jsonp({
    news: testResponse
  });
};
