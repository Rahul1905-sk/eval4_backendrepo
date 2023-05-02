const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // console.log({token});
    if (token) {
        console.log({token});
      var decoded = jwt.verify(token.split(" ")[1], "masai");
      console.log(decoded);
      if(decoded) {
        req.body.userID = decoded.userID
        req.body.username = decoded.username
        next()
      } else {

          res.status(200).send({'msg':"login first"})
      }
    //   console.log({ decoded });
    }
  } catch (error) {
    res.status(400).send({'err':error.message})
  }
};

module.exports = { auth };
