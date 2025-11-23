// DataTable.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';

const mockData = [
  { id: 1, name: 'John Doe', age: 32, status: 'Active' },
  { id: 2, name: 'Jane Smith', age: 28, status: 'Inactive' }
];

const mockColumns = [
  { accessor: 'name', header: 'Name' },
  { accessor: 'age', header: 'Age' },
  { accessor: 'status', header: 'Status' }
];

describe('DataTable Component', () => {
  test('renders table headers correctly', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    mockColumns.forEach((col) => {
      expect(screen.getByText(col.header)).toBeInTheDocument();
    });
  });

  test('renders table rows correctly', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    mockData.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.age.toString())).toBeInTheDocument();
      expect(screen.getByText(row.status)).toBeInTheDocument();
    });
  });

  test('renders no data message when data is empty', () => {
    render(<DataTable data={[]} columns={mockColumns} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });
});
