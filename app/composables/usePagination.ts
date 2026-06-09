export const usePagination = (defaultPerPage = 15) => {
  const page = ref(1);
  const perPage = ref(defaultPerPage);
  const total = ref(0);

  const totalPages = computed(() => Math.ceil(total.value / perPage.value));
  const hasNext = computed(() => page.value < totalPages.value);
  const hasPrev = computed(() => page.value > 1);

  const next = () => {
    if (hasNext.value) page.value++;
  };
  const prev = () => {
    if (hasPrev.value) page.value--;
  };
  const goTo = (p: number) => {
    page.value = p;
  };
  const reset = () => {
    page.value = 1;
  };

  return {
    page,
    perPage,
    total,
    totalPages,
    hasNext,
    hasPrev,
    next,
    prev,
    goTo,
    reset,
  };
};
