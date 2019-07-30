<!--
 * @Description: 节流组件--抽象组件
 * @Author: vins
 * @Email: vins@tuya.com
 * @Date: 2019-07-26 14:40:57
 * @Lasteditors: vins
 -->
<script>
import { typeis } from 'full-ui/src/utils/util';

// 格式化事件配置参数,格式化为对象数组
function formatEventsOption(opt) {
  let opts = [];
  if (typeis(opt, 'object')) {
    opts.push(opt);
    // 如果是对象，则应用到所用的事件上
    opts.all = true;
  } else if (typeis(opt, 'array')) {
    opt.forEach((item, index) => {
      if (typeis(item, 'object')) {
        opts.push(item);
      } else {
        // 忽略不规范的项，为保证顺序不受影响，添加一个空对象
        opts.push({});
        console.warn(`eventsOption的第${index}项不符合规范，被忽略`);
      }
    });
  } else {
    console.warn('eventsOption的类型必须是对象或者对象数组!');
  }
  return opts;
}

// 格式化事件参数,格式化为对象数组
function formatEvents(e) {
  let events = [];
  let _events = [];
  if (typeis(e, 'string') || typeis(e, 'object')) {
    events.push(e);
  } else if (typeis(e, 'array')) {
    events = e;
  } else {
    console.warn('events的类型必须是字符串、对象或者对象数组!');
  }
  // 过滤不符合规范的事件项
  events.forEach((item, index) => {
    if (typeis(item, 'string')) {
      _events.push({ event: item });
    } else if (typeis(item, 'object')) {
      if (!item.event) {
        _events.push(null);
        console.warn('events缺少事件字段标识，被忽略');
      } else {
        _events.push(item);
      }
    } else {
      // 忽略不规范的项，为保证顺序不受影响，添加一个null
      events.push(null);
      console.warn(`events的第${index}项不符合规范，被忽略`);
    }
  });
  return _events;
}

export default {
  name: 'TyThrottle',
  abstract: true,
  props: {
    events: {
      // 格式 { event: 事件名称, noTrailing: 在最后一次调用时是否执行, delay: 延迟时间, handle: 回调函数 }
      type: [String, Array, Object],
      required: true
    },
    eventsOption: {
      // 格式 { noTrailing: 在最后一次调用时是否执行, delay: 延迟时间 }
      type: [Array, Object]
    }
  },
  methods: {
    // 在vnode上添加指令
    addDirective(vnode, name, arg, modifiers, value) {
      function formatArgs(obj) {
        for (let k in obj) {
          if (k === undefined || k === null) {
            delete obj[k];
          }
        }
        return obj;
      }
      vnode.data.directives.unshift(
        formatArgs({
          name,
          arg,
          modifiers,
          value
        })
      );
    }
  },
  render(h) {
    let vnode = this.$slots.default[0];
    let events = this.$options.propsData.events;
    let eventsOption = this.$options.propsData.eventsOption;

    // 保证指令不存在时，为初始化的数组
    if (!vnode.data.directives) {
      vnode.data.directives = [];
    }

    let _eventsOption = [];
    if (eventsOption) {
      _eventsOption = formatEventsOption(eventsOption);
    }
    let _events = formatEvents(events);
    // 遍历添加指令
    _events.forEach((item, index) => {
      if (!item) {
        return;
      }
      // 格式化修饰符
      let modifiers = {};
      // 获取option中的配置，与单个条目中的配置，合并
      let curOption =
        (_eventsOption.all ? _eventsOption[0] : _eventsOption[index]) || {};

      if (item.noTrailing === true || curOption.noTrailing === true) {
        modifiers.noTrailing = true;
      }
      if (
        !typeis(item.delay, 'undefined') ||
        !typeis(curOption.delay, 'undefined')
      ) {
        let delay = item.delay === undefined ? curOption.delay : item.delay;
        modifiers[delay] = true;
      }
      this.addDirective(vnode, 'throttle', item.event, modifiers, item.handle);
    });
    return vnode;
  }
};
</script>
