export const NuxtToasterConfig = {
  position: 'top-right',
  iconPack: 'fontawesome',
  theme: 'bubble',
  duration: 2000,
  register: [
    // Register custom toasts
    {
      name: 'my-error',
      message: 'Oops...Something went wrong',
      options: {
        type: 'error'
      }
    }
  ]
};
