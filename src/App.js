import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState('Uncategorized');
  const [expenseDate, setExpenseDate] = useState('');
  const [budget, setBudget] = useState(0);

  const addExpense = () => {
    if (expenseName && expenseAmount && expenseDate) {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
        category: expenseCategory,
        date: expenseDate,
      };
      setExpenses([...expenses, newExpense]);
      setExpenseName('');
      setExpenseAmount(0);
      setExpenseCategory('Uncategorized');
      setExpenseDate('');
      calculateRemainingBudget();
    }
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    calculateRemainingBudget();
  };

  const calculateRemainingBudget = () => {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const remainingBudget = income - totalExpenses;
    setBudget(remainingBudget);
  };

  const calculateTotalExpenses = () => {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    return totalExpenses;
  };

  const categoryOptions = ['Uncategorized', 'Groceries', 'Utilities', 'Entertainment', 'Transportation', 'Other'];

  return (
    <div className="App">

      <h1>Personal Expense Manager</h1>

      <div>
        <fieldset>
          <legend><b>Balance:</b></legend>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(parseFloat(e.target.value))}
          />
        </fieldset>
      </div>

      <div>
        <fieldset>
          <legend><b>Expense Details</b></legend>
          <label><i>Expense Name:</i></label>
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
          <label><i>Amount:</i></label>
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(parseFloat(e.target.value))}
          />
        </fieldset>
        <br></br>
        <fieldset>
          <legend><b>Category:</b></legend>
          <select
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
          >
            {categoryOptions.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </fieldset>
        <br></br>
        <fieldset>
          <legend><b>Date:</b></legend>
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </fieldset>
        <p><button onClick={addExpense}>Add Expense</button></p>
      </div>

      <div>
        <fieldset>
        <legend><h2>Expenses</h2></legend>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <strong>{expense.name}</strong> - ₹{expense.amount} ({expense.category}) on {expense.date}
              <button onClick={() => deleteExpense(index)}>Delete</button>
            </li>
          ))}
        </ul>
        </fieldset>
      </div>

      <div>
        <fieldset>
        <legend><h2>Budget</h2></legend>
        <p>Remaining Budget: ₹{budget}</p>
        </fieldset>
      </div>

      <button onClick={calculateRemainingBudget}>Calculate Remaining Budget</button>

      <fieldset>
      <legend><h2>Expenses</h2></legend>
      <p>Total Expenses: ₹{calculateTotalExpenses()}</p>
      </fieldset>

    </div>

  );
};

export default App;
