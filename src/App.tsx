import {
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from '@tanstack/react-query';
import { Table } from './components';
import './App.css';

const defaultQueryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const response = await fetch(queryKey[0] as string);
  if (!response.ok)
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  return response.json();
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { queryFn: defaultQueryFn } },
});

const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const App = () => (
  <Providers>
    <Table />
  </Providers>
);

export default App;
