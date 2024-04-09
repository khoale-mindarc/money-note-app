const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const { userId } = req.query;

  const income = IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if ( !title || !category || !date || !amount) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be a positive!" });
    }
    income.userId = userId;
    await income.save();
    res.status(200).json({ message: "Income saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getIncomesByUserId = async (req, res) => {
  const { userId } = req.params;
  if(!userId) {
    return res.status(404).json({ message: "User not found!" });
  }

  try {
    const incomes = await IncomeSchema.find({ userId: userId });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getIncome = async (req, res) => {
  const { userId, id } = req.query;
  if(!userId) {
    return res.status(404).json({ message: "User not found!" });
  }
  if(!id) {
    return res.status(404).json({ message: "Income ID not found!" });
  }

  try {
    const income = await IncomeSchema.find({_id: id, userId: userId});
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { userId, id } = req.query;
  if(!userId) {
    return res.status(404).json({ message: "User not found!" });
  }
  if(!id) {
    return res.status(404).json({ message: "Income ID not found!" });
  }

  try {
    const income = await IncomeSchema.findOneAndDelete({_id: id, userId: userId});
    if(income){
      res.status(200).json({ message: "Income deleted!" });
    }else{
      res.status(404).json({ message: "Income not found for the provided user ID and income ID!" });
    }
  }catch (err) {
    res.status(500).json({ message: "Income error!" });
  }
};

exports.editIncome = async (req, res) => {
  const { userId, id } = req.query;
  const { title, amount, category, description, date } = req.body;
  if(!userId) {
    return res.status(404).json({ message: "User not found!" });
  }
  if(!id) {
    return res.status(404).json({ message: "Income ID not found!" });
  }

  try {
    if (!userId || !title || !category || !date || !amount) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be a positive!" });
    }

    const income = await IncomeSchema.find({_id: id, userId: userId});

    income.userId = userId;
    income.title = title;
    income.amount = amount;
    income.category = category;
    income.description = description;
    income.date = date;

    await income.save();
    res.status(200).json({ message: "Income edited successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getIncomesOverTime = async (req, res) => {
  const { month, year } = req.params;
  const { userId } = req.query;
  if(!userId) {
    return res.status(404).json({ message: "User not found!" });
  }
  if(!id) {
    return res.status(404).json({ message: "Income ID not found!" });
  }

  try {
    const incomes = await IncomeSchema.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${year}-${month}-01`),
            $lt: new Date(`${year}-${parseInt(month) + 1}-01`),
          },
        },
      },
    ]).find({userId: userId});
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};
