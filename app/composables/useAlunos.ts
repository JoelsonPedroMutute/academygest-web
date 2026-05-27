export const useAlunos = () => {
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

  const alunos = ref<any[]>([]);
  const aluno = ref<any>(null);

  const fetchAll = async () => {
    await withLoading(async () => {
      try {
        const res = await api.get<any>(
          `/admin/alunos?page=${page.value}&per_page=${perPage.value}`,
        );
        alunos.value = res.data ?? res;
        if (res.meta) total.value = res.meta.total;
      } catch (e) {
        error("Erro ao carregar alunos");
      }
    });
  };

  const fetchOne = async (id: number) => {
    await withLoading(async () => {
      try {
        aluno.value = await api.get(`/admin/alunos/${id}`);
      } catch (e) {
        error("Erro ao carregar aluno");
      }
    });
  };

  const create = async (data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.post("/admin/alunos", data);
        success("Aluno criado com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao criar aluno");
        throw e;
      }
    });
  };

  const update = async (id: number, data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.patch(`/admin/alunos/${id}`, data);
        success("Aluno actualizado com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao actualizar aluno");
        throw e;
      }
    });
  };

  const remove = async (id: number) => {
    return await withLoading(async () => {
      try {
        await api.del(`/admin/alunos/${id}`);
        success("Aluno removido com sucesso");
        await fetchAll();
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao remover aluno");
        throw e;
      }
    });
  };

  watch(page, fetchAll);

  return {
    alunos: readonly(alunos),
    aluno: readonly(aluno),
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
