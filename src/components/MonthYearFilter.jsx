// src/components/MonthYearFilter.js
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MONTHS, YEARS } from '../constants/dateConstants';

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const Label = styled.span`
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  opacity: 0.9;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;

  &::after {
    content: '🡫';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #60a5fa;
    font-size: 1.1rem;
  }
`;

const Select = styled.select`
  appearance: none;
  background: rgba(15, 23, 42, 0.8);
  color: #f1f5f9;
  border: 2px solid rgba(96, 165, 250, 0.4);
  border-radius: 12px;
  padding: 12px 40px 12px 16px;
  font-size: 1rem;
  font-weight: 500;
  min-width: 160px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    border-color: #60a5fa;
    background: rgba(15, 23, 42, 0.95);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.3);
  }

  option {
    background: #1e293b;
    color: #f1f5f9;
    padding: 10px;
  }
`;

const MonthYearFilter = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
  return (
    <FilterWrapper>
      <Label>Filter:</Label>

      <SelectWrapper>
        <Select
          value={selectedMonth || ''}
          onChange={(e) => onMonthChange(e.target.value || null)}
        >
          <option value="">Last 3 Months</option>
          {MONTHS.map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>
      </SelectWrapper>

      <SelectWrapper>
        <Select
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
        >
          {YEARS.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </SelectWrapper>
    </FilterWrapper>
  );
};

MonthYearFilter.propTypes = {
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

export default MonthYearFilter;