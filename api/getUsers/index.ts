import { AzureFunction, Context } from '@azure/functions';
import fetch = require('node-fetch');

const getUsers: AzureFunction = async function (
  context: Context
): Promise<void> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  context.res = {
    body: await response.json(),
  };
};

export default getUsers;
