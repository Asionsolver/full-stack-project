const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];

  if (!prevToken) {
    return res.status(401).send("No token found");
  }

  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    res.clearCookie(String(user.id)); // clear the previous token

    const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });

    res.cookie(String(user.id), newToken, {
        path: "/",
      httpOnly: true,
      expiresIn: new Date(Date.now() + 1000 * 120),
      sameSite: 'lax',
    });
    req.id = user.id;
  });
    next();
};
