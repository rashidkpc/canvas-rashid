/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { get } from 'axios';
import fileType from 'file-type';

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
        const binary = new Buffer(response.data, 'binary');
        const base64 = binary.toString('base64');
        try {
          const { mime } = fileType(binary);
          const uri = `data:${mime};base64,${base64}`;
          return uri;
        } catch (e) {
          console.log(e, response.data, url);
          return '';
        }

      });
  },
});
