const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !date || !amount) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be a positive!" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getExpensesByUserId = async (req, res) => {
  const userId = req.params;
  try {
    const expenses = await ExpenseSchema.find({ userId: userId }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findById(id);
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Expense Deleted!" });
    })
    .catch((err) => res.status(500).json({ message: "Server Error!" }));
};

exports.editExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, description, date } = req.body;
  try {
    if (!title || !category || !date || !amount) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be a positive!" });
    }

    const expense = await ExpenseSchema.findById(id);

    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.description = description;
    expense.date = date;

    await expense.save();
    res.status(200).json({ message: "Expense edited successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getExpensesOverTime = async (req, res) => {
  const { month, year } = req.params;

  try {
    const expenses = await ExpenseSchema.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${year}-${month}-01`),
            $lt: new Date(`${year}-${parseInt(month) + 1}-01`),
          },
        },
      },
    ]);
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};
