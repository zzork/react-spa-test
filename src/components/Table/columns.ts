import { createColumnHelper } from '@tanstack/react-table';
import { User } from './User';

const columnHelper = createColumnHelper<User>();

export const columns = [
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
