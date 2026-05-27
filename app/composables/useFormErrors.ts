export const useFormErrors = () => {
  const errors = ref<Record<string, string[]>>({});

  const setErrors = (e: Record<string, string[]>) => {
    errors.value = e;
  };
  const clearErrors = () => {
    errors.value = {};
  };
  const getError = (field: string) => errors.value[field]?.[0] ?? null;
  const hasError = (field: string) => !!errors.value[field]?.length;

  const handleApiError = (err: any) => {
    if (err?.data?.errors) setErrors(err.data.errors);
  };

  return {
    errors: readonly(errors),
    setErrors,
    clearErrors,
    getError,
    hasError,
    handleApiError,
  };
};
