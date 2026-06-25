export const useWithHandling = () => {
  const toastsStore = useToastsStore();
  const isLoading = ref(false);

  const withHandling =
    <TArgs extends unknown[], TResult>(
      fn: (...args: TArgs) => Promise<TResult>,
    ) =>
    async (...args: TArgs) => {
      const wasAlreadyLoading = isLoading.value;
      isLoading.value = true;
      try {
        return await fn(...args);
      } catch (error: any) {
        const statusCode = error.data?.statusCode;
        if (statusCode === 404) {
          toastsStore.addToastWithMessage(
            'Looks like the game might have expired. Please start a new game.',
          );
        } else if (statusCode !== 410) {
          // HTTP 410 corresponds to game over in which case we don't want to show a toast
          toastsStore.addToastWithMessage(
            'Something went wrong. Please try again later.',
          );
        }
        throw error;
      } finally {
        if (!wasAlreadyLoading) {
          // Avoid issues on nested calls
          isLoading.value = false;
        }
      }
    };

  return { withHandling, isLoading };
};
