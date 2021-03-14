module.exports = (level) => async (req, res, next) => {
  try {
    if (!req.user[level]) {
      throw new Error("Must be an administrator");
    }

    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};
