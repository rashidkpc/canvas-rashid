import { loadServer } from './server';

export default function(kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'canvas-rashid',
    uiExports: {
      hacks: ['plugins/canvas-rashid/canvas_functions/load'],
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server) {
      loadServer(server);
    },
  });
}
