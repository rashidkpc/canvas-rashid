/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

export const sleep = () => ({
  name: 'sleep',
  help: 'Sleep for N seconds. Super bad.',
  args: {
    time: {
      aliases: ['_'],
      types: ['number'],
      default: 1,
    },
  },
  fn: (context, { time }) => {
    console.log(`Canvas: sleeping for ${time}s`);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(context);
      }, time * 1000);
    });
  },
});
