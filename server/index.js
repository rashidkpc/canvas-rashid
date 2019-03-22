import { canvasFunctions } from './canvas_functions';

export const loadServer = server => {
  server.plugins.interpreter.register({
    serverFunctions: canvasFunctions,
  });
};
