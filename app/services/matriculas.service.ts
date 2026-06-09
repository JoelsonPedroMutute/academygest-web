export const MatriculasService = {
  list() {
    const api = useApi();
    return api.get("/matriculas");
  },

  get(id: number) {
    const api = useApi();
    return api.get(`/matriculas/${id}`);
  },

  create(data: any) {
    const api = useApi();
    return api.post("/matriculas", data);
  },

  update(id: number, data: any) {
    const api = useApi();
    return api.patch(`/matriculas/${id}`, data);
  },

  delete(id: number) {
    const api = useApi();
    return api.del(`/matriculas/${id}`);
  },
};
