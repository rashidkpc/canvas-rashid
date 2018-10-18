canvas.register(function() {
  console.log('LOADING SLEEP PLUGIN WOOOOOOO');
  return {
    name: 'sleep',
    help:
      'Debug plugin. Bad news',
    args: {
      time: {
        types: ['number'],
        help: 'Sleep for a number of milliseconds',
        aliases: ['_'],
        default: '1000',
      },
    },
    fn: (context, args) => {
      return new Promise(function(resolve) {
        setTimeout(() => resolve(context), args.time);
      });
    },
  };
});
