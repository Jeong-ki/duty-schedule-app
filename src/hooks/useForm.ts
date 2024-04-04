import {isEmptyObj} from '@/utils';
import {useCallback, useState} from 'react';

interface IUseFormType<T> {
  initialValues: T;
  handleSubmit: (value: T) => void;
  validation?: (value: T) => Partial<Record<keyof T, string>>;
}

const useForm = <T extends Record<string, any>>({
  initialValues,
  handleSubmit,
  validation,
}: IUseFormType<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const onChange = useCallback((name: keyof T, value: string) => {
    setValues(prev => ({
      ...prev,
      [name]: value.trim(),
    }));
  }, []);

  const onSubmit = useCallback(() => {
    if (validation === undefined) {
      handleSubmit(values);
    } else {
      setErrors(validation(values));
      if (isEmptyObj(validation(values))) {
        handleSubmit(values);
      }
    }
  }, [handleSubmit, validation, values]);

  return {values, setValues, errors, setErrors, onChange, onSubmit};
};

export default useForm;
