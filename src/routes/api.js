const express = require('express') ;
const routes  = express.Router();
const users = require('../controllers/users');
var cors = require('cors')
const auth = require('../controllers/auth');


routes.use(cors());


/* routes.use('/', auth);
routes.use('/users', users);
 */

routes.post('/users', users.create);
routes.post('/authenticate', auth.authenticate);

module.exports = routes;
