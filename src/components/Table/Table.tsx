import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedUniqueValues,
  useReactTable,
  getPaginationRowModel,
  getFacetedMinMaxValues,
} from '@tanstack/react-table';
import {
  Paper,
  TableContainer,
  Table as MaterialTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useUsers } from './useUsers';
import { columns } from './columns';
import { Header } from './Header';
import { PageControls } from './PageControls';

const TableComponent = () => {
  const { data } = useUsers();

  const tableModel = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: {
        pageSize: 3,
      },
    },
  });

  return (
    <TableContainer
      // component={({ children, ...rest }) => (
      //   <Paper {...rest} variant="outlined">
      //     {children}
      //   </Paper>
      // )}
      component={Paper}
    >
      <MaterialTable>
        <TableHead>
          {tableModel.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Header
                  key={header.id}
                  header={header}
                  tableModel={tableModel}
                />
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {tableModel.getRowModel().rows.map((row) => (
            <TableRow key={row.id} hover>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
      <PageControls tableModel={tableModel} />
    </TableContainer>
  );
};

export { TableComponent as Table };
