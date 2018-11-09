/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

canvas.register(() => ({
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
}));
