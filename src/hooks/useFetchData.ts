import { useQuery } from '@tanstack/react-query';

export const useFetchData = <T>({ url }: { url: string }) =>
  useQuery<T>({ queryKey: [url] });
