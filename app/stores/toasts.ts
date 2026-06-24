import type { Toast } from '~/types/toasts';

export const useToastsStore = defineStore('toastsStore', {
  state: () => ({
    toasts: [] as Toast[],
  }),
  actions: {
    addToastWithMessage(message: string) {
      this.toasts.push({
        id: crypto.randomUUID(),
        message,
      });
    },
    removeToastById(toastId: string) {
      this.toasts = this.toasts.filter((toast) => toast.id !== toastId);
    },
  },
});
