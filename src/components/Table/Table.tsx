import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedUniqueValues,
  Table,
  useReactTable,
  getPaginationRowModel,
  getFacetedMinMaxValues,
} from '@tanstack/react-table';
import {
  Button,
  ButtonGroup,
  TableContainer,
  Table as MaterialTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material';
import { useUsers } from './useUsers';
import { columns } from './columns';
import { Header } from './Header';
import classNames from './Table.module.css';

const getAdjacentPages = (
  currentPage: number,
  range: number,
  totalPages: number
) => {
  const pages = [currentPage];
  for (let i = 1; i <= range; i++) {
    if (currentPage - i > 0) pages.unshift(currentPage - i);
    if (currentPage + i <= totalPages) pages.push(currentPage + i);
  }
  return pages;
};

const PageControls = <T,>({
  tableModel,
  pageRange = 2,
}: {
  tableModel: Table<T>;
  pageRange?: number;
}) => {
  const currentPage = tableModel.getState().pagination.pageIndex + 1;
  const itemsPerPage = tableModel.getState().pagination.pageSize;
  const pageCount = tableModel.getPageCount();
  const totalItems = tableModel.getFilteredRowModel().rows.length;
  const currentFirstItem = currentPage * itemsPerPage - itemsPerPage + 1;
  return (
    <fieldset className={classNames.pageControls}>
      <legend aria-live="polite">
        <Typography variant="body2" gutterBottom>
          {`${currentFirstItem} - ${Math.min(
            currentFirstItem + itemsPerPage - 1,
            totalItems
          )} of ${totalItems}`}
        </Typography>
      </legend>
      <ButtonGroup role="navigation">
        <Button
          onClick={() => tableModel.setPageIndex(0)}
          disabled={!tableModel.getCanPreviousPage()}
          aria-label="First page"
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => tableModel.previousPage()}
          disabled={!tableModel.getCanPreviousPage()}
          aria-label="Previous page"
        >
          {'<'}
        </Button>
        {getAdjacentPages(currentPage, pageRange, pageCount).map((pageNum) => {
          const isCurrentPage = pageNum === currentPage;
          return (
            <Button
              key={`page-${pageNum}`}
              onClick={() => tableModel.setPageIndex(pageNum - 1)}
              variant={isCurrentPage ? 'contained' : 'outlined'}
              aria-label={`Page ${pageNum} ${
                isCurrentPage ? '(Current Page)' : ''
              }`}
            >
              {pageNum}
            </Button>
          );
        })}
        <Button
          onClick={() => tableModel.nextPage()}
          disabled={!tableModel.getCanNextPage()}
          aria-label="Next page"
        >
          {'>'}
        </Button>
        <Button
          onClick={() => tableModel.setPageIndex(pageCount - 1)}
          disabled={!tableModel.getCanNextPage()}
          aria-label="Last page"
        >
          {'>>'}
        </Button>
      </ButtonGroup>
    </fieldset>
  );
};

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
    <TableContainer>
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
