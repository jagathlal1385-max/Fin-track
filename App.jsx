import React, { useState, useMemo } from 'react';

// --- MOCK INITIAL DATA ---
const initialCategories = [
  { id: '1', name: 'Dining', color: 'bg-orange-500' },
  { id: '2', name: 'Transport', color: 'bg-blue-500' },
  { id: '3', name: 'Groceries', color: 'bg-green-500' },
  { id: '4', name: 'Entertainment', color: 'bg-purple-500' },
];

const initialExpenses = [
  { id: '1', amount: 450, category: 'Dining', date: '2026-11-05', note: 'Dinner with friends', recurring: false },
  { id: '2', amount: 1200, category: 'Transport', date: '2026-11-06', note: 'Fuel', recurring: false },
  { id: '3', amount: 3200, category: 'Groceries', date: '2026-11-07', note: 'Weekly shopping', recurring: false },
];

const initialBudgets = [
  { category: 'Dining', limit: 2000 },
  { category: 'Transport', limit: 3000 },
];

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [expenses, setExpenses] = useState(initialExpenses);
  const [categories] = useState(initialCategories);
  const [budgets] = useState(initialBudgets);

  // --- DERIVED STATE & CALCULATIONS ---
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const spendingByCategory = useMemo(() => {
    const totals = {};
    expenses.forEach(exp => {
      totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
    });
    return totals;
  }, [expenses]);

  // --- BEHAVIOR DETECTOR ---
  const getAlerts = () => {
    const alerts = [];
    budgets.forEach(budget => {
      const spent = spendingByCategory[budget.category] || 0;
      if (spent > budget.limit * 0.8 && spent < budget.limit) {
