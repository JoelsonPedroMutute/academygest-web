export const useLoading = () => {
  const loading = ref(false);

  const withLoading = async <T>(
    fn: () => Promise<T>,
  ): Promise<T | undefined> => {
    loading.value = true;
    try {
      return await fn();
    } finally {
      loading.value = false;
    }
  };

  return { loading: readonly(loading), withLoading };
};
