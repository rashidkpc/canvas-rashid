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

import { buildESRequest } from '../../../../../x-pack/plugins/canvas/server/lib/build_es_request';


export const eselements = () => ({
  name: 'eselements',
  type: 'render',
  help:
    'Create elements directly from Elasticsearch',
  context: {
    types: ['filter'],
  },
  args: {
    index: {
      types: ['string', 'null'],
      default: '_all',
      help: 'Specify an index pattern. Eg "logstash-*"',
    },
    query: {
      types: ['string'],
      aliases: ['_', 'q'],
      help: 'A Lucene query string',
      default: '-_index:.kibana',
    },
    sort: {
      types: ['string', 'null'],
      help: 'Sort directions as "field, direction". Eg "@timestamp, desc" or "bytes, asc"',
    },
    count: {
      types: ['number'],
      default: 100,
      help: 'The number of docs to pull back. Smaller numbers perform better',
    },
  },
  fn: (context, args, handlers) => {
    context.and = context.and.concat([
      {
        type: 'luceneQueryString',
        query: args.query,
      },
    ]);

    const esRequest = buildESRequest(
      {
        index: args.index,
        body: {
          query: {
            bool: {
              must: [{ match_all: {} }],
            },
          },
        },
      },
      context
    );

    return handlers.elasticsearchClient('search', esRequest).then(resp => {
      // Tip, elements should looks something like:
      /*
        [{
          from: 2019-05-19T..., // the timestamps give us something to filter on. You element will be active betweem these times.
          to: 2019-05-19..., // Anything without these won't show up
          element: {
            type: 'render',
            as: 'debug',
            value: 'woooo'
            css: 'div {}'
            containerStyle: {...} // I'd avoid containerStyle and just cram some CSS in there, easier.
          },
          position: {
            top: 5,
            left: 5,
            height: 100,
            width: 200,
            ... you get it
          }
        }]
      */

      return {
        type: 'render',
        as: 'pageElement',
        value: {
          elements: resp.hits.hits.map(h => h._source),
        },
      };
    });
  },
});
