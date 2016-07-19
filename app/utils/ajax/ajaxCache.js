import ajax from './ajax';

//缓存列表
var cache = {};

/**
 * 生成缓存索引：
 * 由于索引是根据url和data生成的（data是一个对象，存放ajax要提交到后台的数据）
 * 所以要想同一个url，同样的data能够有效地使用缓存，
 * 切勿在url和data中包含每次可变的参数值，如随机数等
 * 比如有一个请求：
 * url: aaa/bbb/cccc?r=0.312738
 * data: {name: 'json'}
 * 其中url后面的r是一个随机数，每次外部发起这个请求时，r的值都会变化
 * 由于r每次都不同，最终会导致缓存索引不相同，结果缓存就无法命中
 * 注：随机数可放置在原始的ajax组件内
 *
 * 还有：如果是同一个接口，最好在同一个页面内，统一url的路径类型，要么都是相对路径，要么都是绝对路径
 * 否则也会导致缓存无法有效管理
 */
function generateCacheKey(url, data) {
  return url + $.param(data);
}

export default function ajaxCache(opts) {
  opts = opts || {};
  var cacheInterval = opts.cacheInterval || (1000 * 60 * 60);//缓存有效时间，默认60分钟
  var proxy = {};
  for (var i in ajax) {
    if (Object.prototype.hasOwnProperty.call(ajax, i)) {
      //在proxy对象上定义ajax组件每一个实例方法的代理
      //注意这个立即调用的函数表达式
      //它返回了一个闭包函数就是最终的代理方法
      proxy[i] = (function (i) {
        return function () {
          var _url = arguments[0],
          _data = arguments[1],
          cacheKey = generateCacheKey(_url, _data),
          cacheItem = cache[cacheKey],
          isCacheValid = false;

          if (cacheItem) {
            var curTime = +new Date();
            if (curTime - cacheItem.cacheStartTime <= cacheInterval) {
              //如果请求时间跟缓存开始时间的间隔在缓存有效时间范围内，就表示缓存是有效的
              isCacheValid = true;
            } else {
              //否则就把缓存清掉
              delete cache[cacheKey];
            }
          }

          if (isCacheValid) {
            //模拟一个异步任务来返回已经缓存的数据
            //通过$defer延迟对象，可以保证这个模拟任务返回的对象跟原始ajax组件调用返回的对象有相同的API
            //这是代理的关键：代理对象与被代理的对象应该具有相同API
            //只有这样当我们取消代理的时候，不会对那些用了代理的组件进行修改
            var $defer = $.Deferred();
            setTimeout(function () {
              $defer.resolve(cacheItem.res);
            }, 10);
            return $.when($defer);
          }

          //缓存失效或者没有缓存的时候调用原始的ajax组件的同名方法去后台请求数据
          return ajax[i].apply(ajax, arguments).done(function (res) {
            //在请求成功之后将结果缓存，并记录当前时间作为缓存的开始时间
            cache[cacheKey] = {
              res: res,
              cacheStartTime: +new Date()
            }
          });
        }
      })(i);
    }
  }
  return proxy;
};
