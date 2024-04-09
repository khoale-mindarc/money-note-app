const {
  addIncome,
  getIncomes,
  getIncomesByUserId,
  getIncome,
  deleteIncome,
  editIncome,
  getIncomesOverTime,
} = require("../controllers/income");
const {
  addExpense,
  getExpenses,
  getExpensesByUserId,
  getExpense,
  deleteExpense,
  editExpense,
  getExpensesOverTime,
} = require("../controllers/expense");
const {
  addCategory,
  getCategories,
  getCategory,
  deleteCategory,
  editCategory,
} = require("../controllers/category");
const {
  getUsers,
  login,
  logout,
  createUser,
} = require("../controllers/user");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// income
router
  .get("/get-incomes", getIncomes)
  .get("/get-incomes/:userId", getIncomesByUserId)
  .get("/get-incomes-over-time/:month/:year", getIncomesOverTime)
  .get("/get-income", getIncome)
  .post("/add-income", addIncome)
  .post("/edit-income", editIncome)
  .delete("/delete-income", deleteIncome);

// expense
router
  .get("/get-expenses", getExpenses)
  .get("/get-expenses/:userId", getExpensesByUserId)
  .get("/get-expenses-over-time/:month/:year", getExpensesOverTime)
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

// login
router
  .post("/login", login)
  .get("/logout", logout)
  .post("/sign-up", createUser)
  .get("/get-users", getUsers);
module.exports = router;
