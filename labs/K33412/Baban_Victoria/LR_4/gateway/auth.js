const fetch = require('node-fetch');

const auth = async (req, res, next) => {

  try {
    const response = await fetch('http://localhost:2920/users/auth', {
      method: req.method,
      headers: {...req.headers}
    });
    const data = await response.json();

    if (data) {
      req.user = data
      next();
    } else {
      res.status(401).json({error: 'Unauthorized'});
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Internal Server Error.'});
  }

};

module.exports = auth;