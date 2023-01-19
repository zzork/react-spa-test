import { useFetchData } from '@/hooks';
import { User } from './User';

export const useUsers = () => useFetchData<User[]>({ url: '/api/getUsers' });
