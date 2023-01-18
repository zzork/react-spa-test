import { AzureFunction, Context } from '@azure/functions';
// import fetch from 'node-fetch';

const getUsers: AzureFunction = async function (
  context: Context
): Promise<void> {
  // const response = await fetch('https://jsonplaceholder.typicode.com/users');
  // const json = await response.json();
  context.res = {
    body: {},
  };
};

export default getUsers;
