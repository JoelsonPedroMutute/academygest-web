export const useDocentes = () => {
  const api = useApi();
  const { loading, withLoading } = useLoading();
  const { success, error } = useToast();
  const {
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
  } = usePagination();

  const docentes = ref<any[]>([]);
  const docente = ref<any>(null);

  const fetchAll = async () => {
    await withLoading(async () => {
      try {
        const res = await api.get<any>(
          `/admin/docentes?page=${page.value}&per_page=${perPage.value}`,
        );
        docentes.value = res.data ?? res;
        if (res.meta) total.value = res.meta.total;
      } catch (e) {
        error("Erro ao carregar docentes");
      }
    });
  };

  const fetchOne = async (id: number) => {
    await withLoading(async () => {
      try {
        docente.value = await api.get(`/admin/docentes/${id}`);
      } catch (e) {
        error("Erro ao carregar docente");
      }
    });
  };

  const create = async (data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.post("/admin/docentes", data);
        success("Docente criado com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao criar docente");
        throw e;
      }
    });
  };

  const update = async (id: number, data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.put(`/admin/docentes/${id}`, data);
        success("Docente actualizado com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao actualizar docente");
        throw e;
      }
    });
  };

  const remove = async (id: number) => {
    return await withLoading(async () => {
      try {
        await api.del(`/admin/docentes/${id}`);
        success("Docente removido com sucesso");
        await fetchAll();
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao remover docente");
        throw e;
      }
    });
  };

  watch(page, fetchAll);

  return {
    docentes: readonly(docentes),
    docente: readonly(docente),
    loading,
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
    fetchAll,
    fetchOne,
    create,
    update,
    remove,
  };
};
