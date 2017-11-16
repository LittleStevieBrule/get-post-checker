
var request = require('request');

console.log(request.post('http://localhost:8080', {form:{key:'value'}}));
console.log(request.get('http://localhost:8080', {form:{key:'value'}}));
