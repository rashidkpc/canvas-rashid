export const die = () => {
  return {
    name: 'die',
    help: 'Start an infinite loop',
    args: {},
    fn: () => {
      let i = 0;
      while (true) {
        if (i % 10000000 === 0) {
          process.stdout.write('.');
        }
        i++;
      }
    },
  };
};
