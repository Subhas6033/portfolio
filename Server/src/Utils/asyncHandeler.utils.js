const asyncHandeler = (requestHandeler) => async (req, res, next) => {
  try {
    return requestHandeler(req, res, next);
  } catch (error) {
    console.log("Error coming from Asynchandeler !!!", error);
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
    next();
  }
};

export default asyncHandeler;
