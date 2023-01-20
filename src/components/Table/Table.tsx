import { useState } from 'react';
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedUniqueValues,
  Header,
  useReactTable,
} from '@tanstack/react-table';
import { useUsers } from './useUsers';
import { User } from './User';
import { Filter } from './Filter';
import classNames from './Table.module.css';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.group({
    header: 'Personal Info',
    columns: [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('username', {
        header: 'Username',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('website', {
        header: 'Website',
        cell: (info) => info.getValue(),
      }),
    ],
  }),
  columnHelper.group({
    header: 'Address',
    columns: [
      columnHelper.accessor('address.street', {
        header: 'Street',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('address.suite', {
        header: 'Suite',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('address.city', {
        header: 'City',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('address.zipcode', {
        header: 'Zipcode',
        cell: (info) => info.getValue(),
      }),
      columnHelper.group({
        header: 'Geo',
        columns: [
          columnHelper.accessor('address.geo.lat', {
            header: 'Lat',
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor('address.geo.lng', {
            header: 'Long',
            cell: (info) => info.getValue(),
          }),
        ],
      }),
    ],
  }),
  columnHelper.group({
    header: 'Company',
    columns: [
      columnHelper.accessor('company.name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('company.catchPhrase', {
        header: 'Catch-phrase',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('company.bs', {
        header: 'Mission Statement',
        cell: (info) => info.getValue(),
      }),
    ],
  }),
];

const SORT_SYMBOLS = {
  asc: '↑',
  desc: '↓',
};

const HeaderTitle = <T,>({
  header,
  children,
}: {
  header: Header<T, unknown>;
  children: React.ReactNode;
}) => {
  const canSort = header.column.getCanSort();
  if (!canSort) return <div>{children}</div>;
  return (
    <button
      className={classNames.headerTitle}
      onClick={header.column.getToggleSortingHandler()}
    >
      {children}
    </button>
  );
};

const TableHeader = <T,>({ header }: { header: Header<T, unknown> }) => {
  const sortDirection = header.column.getIsSorted();
  return (
    <th
      className={
        header.isPlaceholder ? classNames.headerPlaceholder : classNames.header
      }
      key={header.id}
      colSpan={header.colSpan}
    >
      {!header.isPlaceholder && (
        <>
          <HeaderTitle header={header}>
            {flexRender(header.column.columnDef.header, header.getContext())}
            {sortDirection && SORT_SYMBOLS[sortDirection]}
          </HeaderTitle>
          {header.column.getCanFilter() && <Filter column={header.column} />}
        </>
      )}
    </th>
  );
};

export const Table = () => {
  const { data } = useUsers();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const tableData = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <table className={classNames.table}>
        <thead>
          {tableData.getHeaderGroups().map((headerGroup) => (
            <tr className={classNames.headerRow} key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader key={header.id} header={header} />
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={classNames.tableBody}>
          {tableData.getRowModel().rows.map((row) => (
            <tr className={classNames.bodyRow} key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
