import { useState } from 'react';

const useTaskInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
    setValue, 
  };
};

export default useTaskInput;
