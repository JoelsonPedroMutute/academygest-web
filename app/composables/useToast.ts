type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

const toasts = ref<Toast[]>([]);
let nextId = 0;

export const useToast = () => {
  const show = (message: string, type: ToastType = "info", duration = 3000) => {
    const id = nextId++;
    toasts.value.push({ id, message, type, duration });
    setTimeout(() => remove(id), duration);
  };

  const remove = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  const success = (msg: string) => show(msg, "success");
  const error = (msg: string) => show(msg, "error");
  const info = (msg: string) => show(msg, "info");
  const warning = (msg: string) => show(msg, "warning");

  return {
    toasts: readonly(toasts),
    show,
    remove,
    success,
    error,
    info,
    warning,
  };
};
