import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logger from './logger';
import CustomerList from './components/CustomerList';
import RewardsDisplay from './components/RewardsDisplay';
import MonthYearFilter from './components/MonthYearFilter';
import {
  filterTransactions,
  groupByMonth,
  calculateMonthlyPoints,
  calculateTotalPoints,
} from './utils/rewardCalculator';

// ===================== Styled Components =====================

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #f9fafb;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 280px;
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(12px);
  padding: 2rem 1rem;
  box-shadow: 6px 0 15px rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;

  @media (max-width: 900px) {
    width: 80px;
    padding: 1rem 0.5rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
  background: radial-gradient(circle at top left, #0f172a 0%, #111827 100%);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 900px) {
    padding: 1.5rem;
  }
`;

// Full-screen centered loading
const FullScreenLoader = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 9999;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid rgba(96, 165, 250, 0.2);
  border-top: 6px solid #60a5fa;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #60a5fa;
  letter-spacing: 1px;
  text-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
`;

// Keep your existing styled components (Header, RewardsPanel)
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  color: #f9fafb;
`;

const SubTitle = styled.p`
  color: #9ca3af;
  font-size: 1rem;
`;

const RewardsPanel = styled.div`
  background: rgba(31, 41, 55, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Message = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: #9ca3af;
  padding: 3rem;
  background: rgba(31, 41, 55, 0.6);
  border-radius: 16px;
`;

// ===================== Component =====================
function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [customerPage, setCustomerPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch('/data/transactions.json');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setTransactions(data);
        const uniqueCustomers = [...new Set(data.map((tx) => tx.customerId))].sort((a, b) => a - b);
        setCustomers(uniqueCustomers);
        setSelectedCustomer(uniqueCustomers[0]);
        logger.info('Data fetched successfully');
      } catch (err) {
        setError(err.message);
        logger.error(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const customerTransactions = transactions.filter((tx) => tx.customerId === selectedCustomer);
  const filteredTransactions = filterTransactions(customerTransactions, selectedMonth, selectedYear);
  const monthlyTransactions = groupByMonth(filteredTransactions);
  const monthlyPoints = calculateMonthlyPoints(monthlyTransactions);
  const totalPoints = calculateTotalPoints(monthlyPoints);

  if (loading) {
    return (
      <FullScreenLoader>
        <Spinner />
        <LoadingText>Loading Rewards Dashboard...</LoadingText>
      </FullScreenLoader>
    );
  }

  if (error) return <Message>Error: {error}</Message>;

  return (
    <AppContainer>
      <Sidebar>
        <CustomerList
          customers={customers}
          selectedCustomer={selectedCustomer}
          onSelectCustomer={setSelectedCustomer}
          currentPage={customerPage}
          onPageChange={setCustomerPage}
        />
      </Sidebar>

      <MainContent>
        <Header>
          <TitleGroup>
            <Title>Rewards</Title>
            <SubTitle>Track and analyze customer reward points</SubTitle>
          </TitleGroup>

          <MonthYearFilter
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
          />
        </Header>

        {filteredTransactions.length === 0 ? (
          <Message>No transactions found for the selected filters.</Message>
        ) : (
          <RewardsPanel>
            <RewardsDisplay
              monthlyPoints={monthlyPoints}
              totalPoints={totalPoints}
              monthlyTransactions={monthlyTransactions}
            />
          </RewardsPanel>
        )}
      </MainContent>
    </AppContainer>
  );
}

export default App;