

const { app } = require('./app')

var server = app.listen(process.env.PORT||8000, function () {
  console.log('App listening at http://localhost:8000/')
})