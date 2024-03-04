const CategorySchema = require("../models/CategoryModel");

exports.addCategory = async (req, res) => {
  const { name, image } = req.body;

  const category = CategorySchema({
    name,
    image,
  });

  try {
    if (!name) {
      return res.status(400).json({ message: "Name fields is required!" });
    }
    await category.save();
    res.status(200).json({ message: "Category saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await CategorySchema.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategorySchema.findById(id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  CategorySchema.findByIdAndDelete(id)
    .then((category) => {
      res.status(200).json({ message: "Category Deleted!" });
    })
    .catch((err) => res.status(500).json({ message: "Server Error!" }));
};

exports.editCategory = async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Name fields is required!" });
    }

    const category = await CategorySchema.findById(id);

    category.name = name;
    category.image = image;

    await category.save();
    res.status(200).json({ message: "Category edited successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};
