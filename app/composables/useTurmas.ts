export const useTurmas = () => {
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

  const turmas = ref<any[]>([]);
  const turma = ref<any>(null);
  const searchQuery = ref<string>("");
  const cursoId = ref<number | string>("");

  const fetchAll = async () => {
    await withLoading(async () => {
      try {
        const params = new URLSearchParams();
        params.append("page", page.value.toString());
        params.append("per_page", perPage.value.toString());
        
        if (searchQuery.value) params.append("search", searchQuery.value);
        if (cursoId.value) params.append("curso_id", cursoId.value.toString());

        const res = await api.get<any>(
          `/turmas?${params.toString()}`,
        );
        turmas.value = res.data ?? res;
        if (res.meta) total.value = res.meta.total;
        if (res.total) total.value = res.total;
      } catch (e) {
        error("Erro ao carregar turmas");
      }
    });
  };

  const fetchOne = async (id: number) => {
    await withLoading(async () => {
      try {
        turma.value = await api.get(`/turmas/${id}`);
      } catch (e) {
        error("Erro ao carregar turma");
      }
    });
  };

  // Também disponível para alunos
  const fetchOneAluno = async (id: number) => {
    await withLoading(async () => {
      try {
        turma.value = await api.get(`/turmas/${id}`);
      } catch (e) {
        error("Erro ao carregar turma");
      }
    });
  };

  const create = async (data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.post("/turmas", data);
        success("Turma criada com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao criar turma");
        throw e;
      }
    });
  };

  const update = async (id: number, data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.put(`/turmas/${id}`, data);
        success("Turma actualizada com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao actualizar turma");
        throw e;
      }
    });
  };

  const remove = async (id: number) => {
    return await withLoading(async () => {
      try {
        await api.del(`/turmas/${id}`);
        success("Turma removida com sucesso");
        await fetchAll();
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao remover turma");
        throw e;
      }
    });
  };

  watch(page, fetchAll);
  watch([searchQuery, cursoId], () => {
    reset();
    fetchAll();
  });

  return {
    turmas: readonly(turmas),
    turma: readonly(turma),
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
    fetchOneAluno,
    create,
    update,
    remove,
    searchQuery,
    cursoId,
  };
};
