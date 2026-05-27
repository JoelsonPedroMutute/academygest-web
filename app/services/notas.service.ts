export const NotasService = {
  list() {
    const api = useApi();
    return api.get("/notas");
  },

  get(id: number) {
    const api = useApi();
    return api.get(`/notas/${id}`);
  },

  create(data: any) {
    const api = useApi();
    return api.post("/notas", data);
  },

  update(id: number, data: any) {
    const api = useApi();
    return api.patch(`/notas/${id}`, data);
  },

  delete(id: number) {
    const api = useApi();
    return api.del(`/notas/${id}`);
  },
};
