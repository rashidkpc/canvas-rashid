import { die } from './die';
import { lucenefilter } from './lucenefilter';
import { throwFn } from './throw';
import { tryFn } from './try';

export const canvasFunctions = [die, lucenefilter, throwFn, tryFn];

kbnInterpreter.register({
  browserFunctions: canvasFunctions,
});
