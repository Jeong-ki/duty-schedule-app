import {ObjType} from '@/types';
import {isEmptyObj} from '@/utils';
import {useCallback, useState} from 'react';

type UseFormType = {
  initialValues: ObjType;
  handleSubmit: (value: ObjType) => void;
  validation?: (value: ObjType) => ObjType;
};

const useForm = ({initialValues, handleSubmit, validation}: UseFormType) => {
  const [values, setValues] = useState<ObjType>(initialValues);
  const [errors, setErrors] = useState<ObjType>({});

  const onChange = useCallback((name: string, value: string) => {
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
