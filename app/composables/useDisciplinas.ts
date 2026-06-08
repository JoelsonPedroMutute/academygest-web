export const useDisciplinas = () => {
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

  // Set perPage to 10 as requested
  perPage.value = 10;

  const disciplinas = ref<any[]>([]);
  const disciplina = ref<any>(null);
  const searchQuery = ref<string>("");
  const cursoId = ref<number | string>("");
  const semestre = ref<number | string>("");

  const fetchAll = async () => {
    await withLoading(async () => {
      try {
        const params = new URLSearchParams();
        params.append("page", page.value.toString());
        params.append("per_page", perPage.value.toString());
        
        if (searchQuery.value) params.append("search", searchQuery.value);
        if (cursoId.value) params.append("curso_id", cursoId.value.toString());
        if (semestre.value) params.append("semestre", semestre.value.toString());

        const res = await api.get<any>(
          `/disciplinas?${params.toString()}`,
        );
        disciplinas.value = res.data ?? res;
        if (res.meta) total.value = res.meta.total;
        if (res.total) total.value = res.total;
      } catch (e) {
        error("Erro ao carregar disciplinas");
      }
    });
  };

  const fetchOne = async (id: number) => {
    await withLoading(async () => {
      try {
        disciplina.value = await api.get(`/disciplinas/${id}`);
      } catch (e) {
        error("Erro ao carregar disciplina");
      }
    });
  };

  const create = async (data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.post("/disciplinas", data);
        success("Disciplina criada com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao criar disciplina");
        throw e;
      }
    });
  };

  const update = async (id: number, data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.put(`/disciplinas/${id}`, data);
        success("Disciplina actualizada com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao actualizar disciplina");
        throw e;
      }
    });
  };

  const remove = async (id: number) => {
    return await withLoading(async () => {
      try {
        await api.del(`/disciplinas/${id}`);
        success("Disciplina removida com sucesso");
        await fetchAll();
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao remover disciplina");
        throw e;
      }
    });
  };

  watch(page, fetchAll);
  watch([searchQuery, cursoId, semestre], () => {
    reset();
    fetchAll();
  });

  return {
    disciplinas: readonly(disciplinas),
    disciplina: readonly(disciplina),
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
    searchQuery,
    cursoId,
    semestre,
  };
};
