// check user function
async function checkUser(req, res) {
  // res.send("check");
  const username = req.user.username;
  const user_id = req.user.user_id;
  return res
    .status(StatusCodes.OK)
    .json({ message: "valid user", username, user_id });
}

module.exports = { register, login, checkUser };
