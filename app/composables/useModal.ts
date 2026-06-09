export const useModal = () => {
  const isOpen = ref(false);
  const data = ref<any>(null);

  const open = (payload?: any) => {
    data.value = payload ?? null;
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
    data.value = null;
  };

  const toggle = () => (isOpen.value ? close() : open());

  return {
    isOpen: readonly(isOpen),
    data: readonly(data),
    open,
    close,
    toggle,
  };
};
