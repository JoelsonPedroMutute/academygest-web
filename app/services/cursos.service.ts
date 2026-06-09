export const CursosService = {
  list() {
    const api = useApi();
    return api.get("/cursos");
  },

  get(id: number) {
    const api = useApi();
    return api.get(`/cursos/${id}`);
  },

  create(data: any) {
    const api = useApi();
    return api.post("/cursos", data);
  },

  update(id: number, data: any) {
    const api = useApi();
    return api.patch(`/cursos/${id}`, data);
  },

  delete(id: number) {
    const api = useApi();
    return api.del(`/cursos/${id}`);
  },
};
