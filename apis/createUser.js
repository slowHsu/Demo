const addUser = require('../models/mysql/user').addUser;
const Sequelize = require('sequelize');
const user = require('../models/mysql/db').User;

function createUser(req, res) {
  console.debug('get POST request: createUser');
  let name = req.body.name;

  //Check name is valid or not
  if ( !/^[A-Za-z0-9]+$/i.test(name)) {
    console.info(`[createUser] Illegal character: ${name}`)
    res.status(400).json( {error: true, message: 'Illegal character.' } );
  } else {
    addUser(name, (err, id) => {
          if (err) {
            if (err === 'Duplicate')  {
                console.info(`[createUser] Duplicate: ${name}`)
                return res.status(200).json( {success: true, message: 'Duplicate user:' + name, id:id } );
            }
            console.error(err);
            return res.status(500).json( {error: true, message: 'Internal Server Error' } );
          }
        console.info(`[createUser] Success: ${name}`);
        res.status(200).json( {success: true, message: 'Success create user:' + name, id: id} );
      })
  }
}

module.exports = createUser;