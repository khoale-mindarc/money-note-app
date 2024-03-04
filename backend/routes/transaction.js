const {
  addIncome,
  getIncomes,
  getIncome,
  deleteIncome,
  editIncome,
  getIncomesOverTime,
} = require("../controllers/income");
const {
  addExpense,
  getExpenses,
  getExpense,
  deleteExpense,
  editExpense,
} = require("../controllers/expense");
const {
  addCategory,
  getCategories,
  getCategory,
  deleteCategory,
  editCategory,
} = require("../controllers/category");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// income
router
  .get("/get-incomes", getIncomes)
  .get("/get-incomes-over-time/:month/:year", getIncomesOverTime)
  .get("/get-income/:id", getIncome)
  .post("/add-income", addIncome)
  .post("/edit-income/:id", editIncome)
  .delete("/delete-income/:id", deleteIncome);

// expense
router
  .get("/get-expenses", getExpenses)
  .get("/get-expense/:id", getExpense)
  .post("/add-expense", addExpense)
  .post("/edit-expense/:id", editExpense)
  .delete("/delete-expense/:id", deleteExpense);

//category
router
  .get("/get-categories", getCategories)
  .get("/get-category/:id", getCategory)
  .post("/add-category", addCategory)
  .post("/edit-category/:id", editCategory)
  .delete("/delete-category/:id", deleteCategory);

module.exports = router;
