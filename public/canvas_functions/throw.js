export const throwFn = () => {
  console.log('LOADING THROW PLUGIN');
  return {
    name: 'throw',
    help: 'Debug plugin. Throws',
    args: {},
    fn: (context, args) => {
      throw new Error('This is intentional.');
    },
  };
};
