const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // const headers = req.headers["authorization"];
    // console.log(headers);
    // const token = headers.split(" ")[1];

    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    // console.log(cookies);
    if (!token) {
        return res.status(404).json({ message: "No Token Found" });
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }
        // console.log(user)
        req.id = user.id;
    });
    next();
};

module.exports = verifyToken;