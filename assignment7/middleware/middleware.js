const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
    try {
      const token = req.headers.authorization;

        if(!token){
            return res.json({
                msg:"user is not authenticated."
            });
        }

        const success = jwt.verify(token, SECRET_KEY);

        if(!success){
            return res.json({
                msg:"user is not authenticated."
            });
        }

        next();


    } catch (err) {
      res.status(500).json({ message: err.message })
    }
}

module.exports = {
    middleware
}