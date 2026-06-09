export const TurmasService = {
  list() {
    const api = useApi();
    return api.get("/turmas");
  },

  get(id: number) {
    const api = useApi();
    return api.get(`/turmas/${id}`);
  },

  create(data: any) {
    const api = useApi();
    return api.post("/turmas", data);
  },

  update(id: number, data: any) {
    const api = useApi();
    return api.patch(`/turmas/${id}`, data);
  },

  delete(id: number) {
    const api = useApi();
    return api.del(`/turmas/${id}`);
  },
};
