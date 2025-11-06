import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculatePoints } from '../utils/rewardCalculator';
import { PAGE_SIZE } from '../constants/dateConstants';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
 color:#2c3e50
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  color:rgb(25, 118, 210);
   text-align: center;
`;

const PaginationButton = styled.button`
  margin: 5px;
`;

const TransactionTable = ({ transactions, currentPage, onPageChange }) => {
    if (transactions?.length === 0) {
        return <p>No transactions</p>;
    }

    const start = (currentPage - 1) * PAGE_SIZE;
    const paginatedTransactions = transactions?.slice(start, start + PAGE_SIZE);
    const totalPages = Math.ceil(transactions?.length / PAGE_SIZE);
    console.log("paginatedTransactions", paginatedTransactions)
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <Th>Transaction ID</Th>
                        <Th>Amount</Th>
                        <Th>Date</Th>
                        <Th>Points</Th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedTransactions?.map(tx => (
                        <tr key={tx.transactionId}>
                            <Td>{tx.transactionId}</Td>
                            <Td>{tx.amount}</Td>
                            <Td>{tx.date}</Td>
                            <Td>{calculatePoints(tx.amount)}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationButton key={i + 1} onClick={() => onPageChange(i + 1)} disabled={currentPage === i + 1}>
                        {i + 1}
                    </PaginationButton>
                ))}
            </div>
        </div>
    );
};

TransactionTable.propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.shape({
        transactionId: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
    })).isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default TransactionTable;