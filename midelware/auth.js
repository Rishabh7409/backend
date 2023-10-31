const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../controller/userController");

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      // console.log("token", token);
      let JWT_SECRET = "bfnvjfcsdkbsdkjcv";
      jwt.verify(
        token,
        process.env.JWT_SECRET || JWT_SECRET,
        async (err, decoded) => {
          if (err) {
            return res.json({
              status: 401,
              message: "You need to be logged in to access this route",
            });
          } else {
            let email = decoded.email;

            let userData = await getUserByEmail(req, res, email);
            // console.log("********************", userData);
            if (userData.status == 1) {
              if (userData && email) {
                req.email = email;
                req.userName = userData.name;

                next();
              } else {
                return res.status(401).json({
                  status: 401,
                  message: "User Not Exist",
                });
              }
            } else {
              return res.status(401).json({
                status: 0,
                message: req.__("user do not exist"),
              });
            }
          }
        }
      );
    } else {
      return res.json({
        status: 401,
        message: "Auth token is not supplied",
      });
    }
  } else {
    return res.json({
      status: 401,
      message: "Auth token is not supplied",
    });
  }
};
