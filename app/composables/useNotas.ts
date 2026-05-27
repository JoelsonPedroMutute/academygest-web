export const useNotas = () => {
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

  const notas = ref<any[]>([]);
  const nota = ref<any>(null);

  const fetchAll = async (role: "admin" | "aluno" = "admin") => {
    await withLoading(async () => {
      try {
        const base = role === "admin" ? "/admin" : "/aluno";
        const res = await api.get<any>(
          `${base}/notas?page=${page.value}&per_page=${perPage.value}`,
        );
        notas.value = res.data ?? res;
        if (res.meta) total.value = res.meta.total;
      } catch (e) {
        error("Erro ao carregar notas");
      }
    });
  };

  const fetchOne = async (id: number) => {
    await withLoading(async () => {
      try {
        nota.value = await api.get(`/admin/notas/${id}`);
      } catch (e) {
        error("Erro ao carregar nota");
      }
    });
  };

  const create = async (data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.post("/admin/notas", data);
        success("Nota criada com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao criar nota");
        throw e;
      }
    });
  };

  const update = async (id: number, data: any) => {
    return await withLoading(async () => {
      try {
        const res = await api.patch(`/admin/notas/${id}`, data);
        success("Nota actualizada com sucesso");
        await fetchAll();
        return res;
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao actualizar nota");
        throw e;
      }
    });
  };

  const remove = async (id: number) => {
    return await withLoading(async () => {
      try {
        await api.del(`/admin/notas/${id}`);
        success("Nota removida com sucesso");
        await fetchAll();
      } catch (e: any) {
        error(e?.data?.message ?? "Erro ao remover nota");
        throw e;
      }
    });
  };

  watch(page, () => fetchAll());

  return {
    notas: readonly(notas),
    nota: readonly(nota),
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
