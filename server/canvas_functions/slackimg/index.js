/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { get } from 'axios';


export const slackimg = () => ({
  name: 'slackimg',
  help: 'Grabs an image from slack and serves is up as base64. LOL',
  args: {
    url: {
      aliases: ['_'],
      types: ['string'],
    },
    token: {
      types: ['string'],
    }
  },
  fn: (context, { url, token }) => {
    return get(url, {
      responseType: 'arraybuffer',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        const base64 = new Buffer(response.data, 'binary').toString('base64')
        return `data:text/plain;base64,${base64}`;
      });
  },
});
