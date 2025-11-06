import logger from '../logger';

export const calculatePoints = (amount) => {
  if (typeof amount !== 'number' || amount < 0) {
    logger.error(`Invalid amount: ${amount}`);
    return 0;
  }
  let points = 0;
  if (amount > 100) {
    points += 2 * (amount - 100);
  }
  if (amount > 50) {
    points += 1 * Math.min(amount - 50, 50);
  }
  logger.info(`Calculated points for ${amount}: ${points}`);
  return Math.floor(points); // Assuming points are integers, floor for fractions
};

export const getLastThreeMonths = () => {
  const now = new Date();
  const months = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      year: date.getFullYear()
    });
  }
  return months.reverse();
};

export const filterTransactions = (transactions, selectedMonth, selectedYear) => {
  if (!selectedMonth && !selectedYear) return transactions;
  return transactions.filter(tx => {
    const txDate = new Date(tx.date);
    const txMonth = txDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    const txYear = txDate.getFullYear();
    return (!selectedMonth || txMonth === selectedMonth) && (!selectedYear || txYear === selectedYear);
  });
};

export const groupByMonth = (transactions) => {
  const groups = {};
  transactions.forEach(tx => {
    const date = new Date(tx.date);
    const key = `${date.toLocaleString('default', { month: 'short' }).toUpperCase()}-${date.getFullYear()}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  });
  return groups;
};

export const calculateMonthlyPoints = (monthlyTransactions) => {
  return Object.keys(monthlyTransactions).reduce((acc, key) => {
    acc[key] = monthlyTransactions[key].reduce((sum, tx) => sum + calculatePoints(tx.amount), 0);
    return acc;
  }, {});
};

export const calculateTotalPoints = (monthlyPoints) => {
  return Object.values(monthlyPoints).reduce((sum, points) => sum + points, 0);
};