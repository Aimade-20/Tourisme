const createCatogory = require("../services/categoryServices");

const createCatogory = async (req, res) => {
  try {
    const name = req.body.name;
    const image = req.file.path;

    const category = await createCatogory(name, image);
    return res.status(201).json({
        message : "successfully",
        category
    })
  } catch (error) {
    return res.status(500).json({
        message : error.message
    })
  }
};

module.exports = createCatogory
