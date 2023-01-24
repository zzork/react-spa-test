import { Table } from '@tanstack/react-table';
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import classNames from './PageControls.module.css';

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

export const PageControls = <T,>({
  tableModel,
  pageRange = 2,
  pageSizeOptions = [3, 5, 10],
}: {
  tableModel: Table<T>;
  pageRange?: number;
  pageSizeOptions?: number[];
}) => {
  const currentPage = tableModel.getState().pagination.pageIndex + 1;
  const itemsPerPage = tableModel.getState().pagination.pageSize;
  const pageCount = tableModel.getPageCount();
  const totalItems = tableModel.getFilteredRowModel().rows.length;
  const currentFirstItem = currentPage * itemsPerPage - itemsPerPage + 1;
  const currentLastItem = Math.min(
    currentFirstItem + itemsPerPage - 1,
    totalItems
  );
  const selectLabelId = 'rows-per-page-id';
  return (
    <div className={classNames.pageControls}>
      <InputLabel disableAnimation id={selectLabelId}>
        Rows per page:{' '}
      </InputLabel>
      <Select
        labelId={selectLabelId}
        value={itemsPerPage}
        onChange={(e) => tableModel.setPageSize(Number(e.target.value))}
        variant="standard"
        autoWidth
      >
        {pageSizeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <InputLabel>{`${currentFirstItem} - ${currentLastItem} of ${totalItems}`}</InputLabel>
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
    </div>
  );
};
