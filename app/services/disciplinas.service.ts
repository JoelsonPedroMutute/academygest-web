export const DisciplinasService = {
  list() {
    const api = useApi();
    return api.get("/disciplinas");
  },

  get(id: number) {
    const api = useApi();
    return api.get(`/disciplinas/${id}`);
  },

  create(data: any) {
    const api = useApi();
    return api.post("/disciplinas", data);
  },

  update(id: number, data: any) {
    const api = useApi();
    return api.patch(`/disciplinas/${id}`, data);
  },

  delete(id: number) {
    const api = useApi();
    return api.del(`/disciplinas/${id}`);
  },
};
