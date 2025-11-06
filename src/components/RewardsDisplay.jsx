import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TransactionTable from './TransactionTable';

const Container = styled.div`
  margin: 20px 0;
`;

const MonthCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-left: 5px solid #3498db;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

const MonthInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MonthName = styled.h4`
  margin: 0;
  color: #2c3e50;
  font-size: 1.25rem;
`;

const Points = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.95rem;
`;

const ViewButton = styled.span`
  color: #3498db;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 16px;
  border: 2px solid #3498db;
  border-radius: 25px;
  transition: all 0.3s ease;

  &:hover {
    background: #3498db;
    color: white;
  }
`;

const Arrow = styled.span`
  margin-left: 8px;
  font-weight: bold;
  transition: transform 0.3s ease;
  ${props => props.isOpen && 'transform: rotate(180deg);'}
`;

const ExpandedSection = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: #f8fdff;
  border-radius: 10px;
  border: 1px dashed #90caf9;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const TotalCard = styled(MonthCard)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  border-left: none;
  cursor: default;

  &:hover {
    transform: none;
  }
`;

const RewardsDisplay = ({ monthlyPoints, totalPoints, monthlyTransactions }) => {
  const [selectedMonthKey, setSelectedMonthKey] = useState(null);
  const [transactionPage, setTransactionPage] = useState(1);

  const toggleMonth = (key) => {
    setSelectedMonthKey(selectedMonthKey === key ? null : key);
    setTransactionPage(1); // Reset page when opening
  };

  return (
    <Container>
      <h3 style={{ color: '#f9fafb', marginBottom: '24px' }}>Reward Points Per Month</h3>

      {Object.keys(monthlyPoints).map(key => (
        <MonthCard key={key} onClick={() => toggleMonth(key)}>
          <MonthHeader>
            <MonthInfo>
              <MonthName>{key}</MonthName>
              <Points>{monthlyPoints[key]} points</Points>
            </MonthInfo>
            <ViewButton>
              View <Arrow isOpen={selectedMonthKey === key}> {selectedMonthKey === key ? "🡩" : "🡫"}</Arrow>
            </ViewButton>
          </MonthHeader>

          {/* Expanded Transaction Table */}
          {selectedMonthKey === key && (
            <ExpandedSection>
              <h4 style={{ margin: '0 0 16px', color: '#1976d2' }}>
                Transactions for {key}
              </h4>
              {console.log("key", key)}
              <TransactionTable
                transactions={monthlyTransactions[selectedMonthKey]}
                currentPage={transactionPage}
                onPageChange={setTransactionPage}
              />
            </ExpandedSection>

          )}
        </MonthCard>
      ))}

      <TotalCard>
        Total Reward Points: {totalPoints}
      </TotalCard>
    </Container>
  );
};

RewardsDisplay.propTypes = {
  monthlyPoints: PropTypes.objectOf(PropTypes.number).isRequired,
  totalPoints: PropTypes.number.isRequired,
  monthlyTransactions: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
};

export default RewardsDisplay;