export const useCursos = () => {
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

  const cursos = ref<any[]>([]);
  const curso = ref<any>(null);
  const allCursos = ref<any[]>([]);

  const fetchAll = async () => {
    await withLoading(async () => {
      try {
        const res = await api.get<any>(
          `/admin/cursos?page=${page.value}&per_page=${perPage.value}`,
        );
        cursos.value = res.data ?? res;
        if (res.meta) total.value = res.meta.total;
      } catch (e) {
        error("Erro ao carregar cursos");
      }
    });
  };

  const fetchAllCursos = async () => {
    try {
      const res = await api.get<any>(
        `/admin/cursos?per_page=100`,
      );
      allCursos.value = res.data ?? res;
    } catch (e) {
      // Fallback to regular cursos
      allCursos.value = cursos.value;
    }
  };

  const fetchOne = async (id: number) => {
    await withLoading(async () => {
      try {
        curso.value = await api.get(`/admin/cursos/${id}`);
      } catch (e) {
        error("Erro ao carregar curso");
      }
    });
  };

  const create = async (data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.post("/admin/cursos", data);
        success("Curso criado com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao criar curso");
        throw e;
      }
    });
  };

  const update = async (id: number, data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.put(`/admin/cursos/${id}`, data);
        success("Curso actualizado com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao actualizar curso");
        throw e;
      }
    });
  };

  const remove = async (id: number) => {
    return await withLoading(async () => {
      try {
        await api.del(`/admin/cursos/${id}`);
        success("Curso removido com sucesso");
        await fetchAll();
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao remover curso");
        throw e;
      }
    });
  };

  watch(page, fetchAll);

  return {
    cursos: readonly(cursos),
    curso: readonly(curso),
    allCursos: readonly(allCursos),
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
    fetchAllCursos,
    fetchOne,
    create,
    update,
    remove,
  };
};
