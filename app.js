var app = require('express')();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8080);

function requestData(){
  this.query = [];
  this.body = [];
  this.method = "";
  return this;
}

function handleRequest(req) {
  var data = requestData();
  getQuery(req, data);
  getBody(req, data);
  getMethod(req, data);
  return data;
}

function getBody(req, data){
  debugger;
  for( var param in req.query) {
    data.query.push({key: param, value: req.query[param] });
  }
  return data;
}

function getQuery(req, data){
  for( var param in req.body) {
    data.body.push({key: param, value: req.body[param] });
  }
  return data;
}

function getMethod(req, data){
  data.method = req.method;
  return data;
}

app.get('/', function(req, res) {
  res.render('request', handleRequest(req));
});

app.post('/', function(req, res) {
  res.render('request', handleRequest(req));
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' +
    app.get('port') +
    '; press Ctrl-C to terminate.');
});
