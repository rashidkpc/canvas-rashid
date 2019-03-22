export const lucenefilter = () => ({
  name: 'lucenefilter',
  aliases: [],
  type: 'filter',
  context: {
    types: ['filter'],
  },
  help:
    'Create a filter with a lucene query string. Only works with elasticsearch backed datasources',
  args: {
    query: {
      types: ['string'],
      aliases: ['q'],
      help: 'A lucene query string',
    },
  },
  fn: (context, args) => {
    const filter = {
      type: 'luceneQueryString',
      query: args.query,
    };

    return { ...context, and: [...context.and, filter] };
  },
});
