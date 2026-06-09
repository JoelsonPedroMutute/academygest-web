export const AlunosService = {
  list() {
    const api = useApi();
    return api.get("/alunos");
  },

  get(id: number) {
    const api = useApi();
    return api.get(`/alunos/${id}`);
  },

  create(data: any) {
    const api = useApi();
    return api.post("/alunos", data);
  },

  update(id: number, data: any) {
    const api = useApi();
    return api.patch(`/alunos/${id}`, data);
  },

  delete(id: number) {
    const api = useApi();
    return api.del(`/alunos/${id}`);
  },
};
