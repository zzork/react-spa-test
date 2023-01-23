import { useState } from 'react';
import { IconButton, TableCell, Typography } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import { flexRender, Header } from '@tanstack/react-table';
import { Filter } from '@/components/Table/Filter';
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

export const HeaderComponent = <T,>({
  header,
}: {
  header: Header<T, unknown>;
}) => {
  return (
    <TableCell key={header.id} colSpan={header.colSpan}>
      {!header.isPlaceholder && (
        <>
          <HeaderTitle header={header}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </HeaderTitle>
          {header.column.getCanFilter() && <Filter column={header.column} />}
        </>
      )}
    </TableCell>
  );
};

export { HeaderComponent as Header };
