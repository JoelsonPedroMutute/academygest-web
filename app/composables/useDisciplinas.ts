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

  const disciplinas = ref<any[]>([]);
  const disciplina = ref<any>(null);

  const fetchAll = async (role: "admin" | "aluno" | "docente" = "admin") => {
    await withLoading(async () => {
      try {
        const base = role === "admin" ? "/admin" : `/${role}`;
        const res = await api.get<any>(
          `${base}/disciplinas?page=${page.value}&per_page=${perPage.value}`,
        );
        disciplinas.value = res.data ?? res;
        if (res.meta) total.value = res.meta.total;
      } catch (e) {
        error("Erro ao carregar disciplinas");
      }
    });
  };

  const fetchOne = async (id: number) => {
    await withLoading(async () => {
      try {
        disciplina.value = await api.get(`/admin/disciplinas/${id}`);
      } catch (e) {
        error("Erro ao carregar disciplina");
      }
    });
  };

  const create = async (data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.post("/admin/disciplinas", data);
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
        const res = await api.patch(`/admin/disciplinas/${id}`, data);
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
        await api.del(`/admin/disciplinas/${id}`);
        success("Disciplina removida com sucesso");
        await fetchAll();
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao remover disciplina");
        throw e;
      }
    });
  };

  watch(page, () => fetchAll());

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
  };
};
