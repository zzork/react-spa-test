import { useState } from 'react';
import { Collapse, IconButton, TableCell, Typography } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import { Column, flexRender, Header, Table } from '@tanstack/react-table';
import { Filter, RangeFilter } from '@/components/Table/Filter';
import classNames from './Header.module.css';

const HeaderTitle = <T,>({
  header,
  children,
}: {
  header: Header<T, unknown>;
  children: React.ReactNode;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const canSort = header.column.getCanSort();
  const sortDirection = header.column.getIsSorted();
  const handleToggleSort = header.column.getToggleSortingHandler();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && handleToggleSort instanceof Function)
      handleToggleSort(e);
  };

  if (!canSort) return <Typography align="center">{children}</Typography>;

  return (
    <Typography gutterBottom noWrap>
      <span
        role="button"
        tabIndex={0}
        onClick={handleToggleSort}
        onKeyDown={handleKeyPress}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={classNames.headerButton}
      >
        {children}
        <IconButton size="small">
          <ArrowUpward
            color={sortDirection ? 'inherit' : 'disabled'}
            sx={{
              opacity: isHovering || sortDirection ? '1' : '0',
              transform:
                sortDirection && sortDirection === 'desc'
                  ? 'rotate(180deg)'
                  : '',
            }}
          />
        </IconButton>
      </span>
    </Typography>
  );
};

const FilterComponent = <T,>({
  column,
  isRangeFilter,
}: {
  column: Column<T>;
  isRangeFilter: boolean;
}) =>
  isRangeFilter ? <RangeFilter column={column} /> : <Filter column={column} />;

export const HeaderComponent = <T,>({
  header,
  tableModel,
  showFilters,
  ...props
}: {
  header: Header<T, unknown>;
  tableModel: Table<T>;
  showFilters: boolean;
}) => {
  const { column } = header;
  const canFilter = showFilters && column.getCanFilter();
  // @TODO: there has to be a better way to get the filter type
  const isRangeFilter =
    typeof tableModel
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id) === 'number';

  return (
    <TableCell {...props} key={header.id} colSpan={header.colSpan}>
      {!header.isPlaceholder && (
        <>
          <HeaderTitle header={header}>
            {flexRender(column.columnDef.header, header.getContext())}
          </HeaderTitle>
          <Collapse in={canFilter}>
            <FilterComponent column={column} isRangeFilter={isRangeFilter} />
          </Collapse>
        </>
      )}
    </TableCell>
  );
};

export { HeaderComponent as Header };
