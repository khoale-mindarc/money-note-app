const {
  addIncome,
  getIncomes,
  getIncome,
  deleteIncome,
  editIncome,
} = require("../controllers/income");
const {
  addExpense,
  getExpenses,
  getExpense,
  deleteExpense,
  editExpense,
} = require("../controllers/expense");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router
  .get("/get-incomes", getIncomes)
  .get("/get-income/:id", getIncome)
  .post("/add-income", addIncome)
  .post("/edit-income/:id", editIncome)
  .delete("/delete-income/:id", deleteIncome)
  .get("/get-expenses", getExpenses)
  .get("/get-expense/:id", getExpense)
  .post("/add-expense", addExpense)
  .post("/edit-expense/:id", editExpense)
  .delete("/delete-expense/:id", deleteExpense);

module.exports = router;
