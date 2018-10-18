
canvas.register(function() {
  console.log('LOADING RANDOM PLUGIN WOOOOOOO');
  return {
    name: 'random',
    help: 'Make a random number between 0 and 1',
    args: {},
    fn: () => Math.random(),
  };
});
