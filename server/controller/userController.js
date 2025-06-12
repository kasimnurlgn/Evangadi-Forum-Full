// login function
async function login(req, res) {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  try {
    // Find user by email
    const [users] = await dbConnection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (users.length === 0) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ message: "User login successful", token });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
