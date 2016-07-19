import ajax from './ajax';
import ajaxCache from './ajaxCache';

export default function(opts) {
  opts = opts || {};
  if(opts.cache || opts.cacheInterval) {
    return ajaxCache(opts);
  } else {
    return ajax;
  }
}
