import { useRef, useState } from 'react';
import { flexRender, Table } from '@tanstack/react-table';
import {
  ButtonGroup,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Switch,
} from '@mui/material';
import { FilterList, FilterListOff, ViewColumn } from '@mui/icons-material';
import React from 'react';

export const GlobalControls = <T,>({
  tableModel,
  showFilters,
  setShowFilters,
}: {
  tableModel: Table<T>;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [columnAnchorEl, setColumnAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [columnSelectionOpen, setColumnSelectionOpen] =
    useState<boolean>(false);

  const FilterIcon = showFilters ? FilterListOff : FilterList;

  const handleColumnClick = (event: React.MouseEvent<HTMLElement>) => {
    setColumnAnchorEl(event.currentTarget);
    setColumnSelectionOpen((prev) => !prev);
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <ButtonGroup>
        <IconButton
          onClick={() => setShowFilters((prev) => !prev)}
          aria-label={`${showFilters ? 'Hide' : 'Show'} filters`}
        >
          <FilterIcon />
        </IconButton>
        <IconButton onClick={handleColumnClick} aria-label="Choose columns">
          <ViewColumn />
        </IconButton>
      </ButtonGroup>
      <Menu anchorEl={columnAnchorEl} open={columnSelectionOpen}>
        {tableModel.getAllLeafColumns().map((column) => (
          <MenuItem key={column.id}>
            <InputLabel id={`switch-input-${column.id}`}>
              {column.id}
            </InputLabel>
            <Switch />
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
};
