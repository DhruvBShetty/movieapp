var jwt = require('jsonwebtoken');
var token = jwt.sign({ user: 'dhruv', email:'dhruvbshetty@gmail.com'}, 'shhhhh');

console.log(jwt.verify(token,'shhhhh'))
 