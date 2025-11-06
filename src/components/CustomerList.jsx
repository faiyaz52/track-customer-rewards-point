import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PAGE_SIZE } from '../constants/dateConstants';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px; 
  color:#f9fafb
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  color:#000
`;

const PaginationButton = styled.button`
  margin: 5px;
`;

const CustomerList = ({ customers, selectedCustomer, onSelectCustomer, currentPage, onPageChange }) => {
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedCustomers = customers.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(customers.length / PAGE_SIZE);

  return (
    <div>
      <h2>Customers</h2>
      <Table>
        <thead>
          <tr>
            <Th>Customer ID</Th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.map(id => (
            <tr key={id} onClick={() => onSelectCustomer(id)} style={{ background: selectedCustomer === id ? '#eee' : 'white', cursor: 'pointer' }}>
              <Td>{id}</Td>
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

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedCustomer: PropTypes.number,
  onSelectCustomer: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomerList;