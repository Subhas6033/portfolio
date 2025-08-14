const asyncHandeler = (requestHandeler) => async (req, res, next) => {
  try {
    return requestHandeler(req, res);
  } catch (error) {
    console.log("Error coming from Asynchandeler !!!", error);
    req.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
    next();
  }
};

export default asyncHandeler