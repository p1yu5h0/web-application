const paginationController = async (req, resp) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const result = await User.paginate({}, { page, limit });
    resp.json(result);
  } catch (err) {
    console.error("Error paginating data:", err);
    resp.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  paginationController,
};
