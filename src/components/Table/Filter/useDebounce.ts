import { useEffect, useState } from 'react';

export const useDebounce = ({
  value,
  ms,
  onChange = () => null,
}: {
  value: unknown;
  ms: number;
  onChange?: (value: unknown) => void;
}) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
      onChange(value);
    }, ms);
    return () => clearTimeout(timerId);
  }, [value]);

  return debouncedValue;
};
