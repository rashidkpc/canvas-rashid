/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
export const tryFn = () => ({
  name: 'try',
  aliases: [],
  help: 'Handle errors gracefully',
  args: {
    expression: {
      resolve: false,
      aliases: ['fn', '_'],
      help: 'A Canvas expression to try. If this errors, catch will be returned',
    },
    catch: {
      resolve: false,
      help: 'Value to return if expression errors',
    },
  },
  fn: (context, args) => {
    return args.expression(context).catch(() => args.catch(context));
  },
});
