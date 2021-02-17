import {useState, useEffect} from 'react';

const useValidation = (initalState: any, handleValidation: any, handler: any) => {
  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if(isReady) {
      const haveErrors = Object.keys(errors).length !== 0;
      if(!haveErrors) handler();

      setIsReady(false);
    }
  }, []);

  const handleChange = (e: any) => {
    setValues({
      ...values,
       [e.target.name] : e.target.value
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errors = handleValidation(values);
    setErrors(errors);
    setIsReady(true);
  }

  return {
    values,
    errors,
    isReady,
    handleChange,
    handleSubmit
  }
};

export default useValidation;