/*
 * @Author: Janaeiw
 * @Date: 2022/07/06 13:49
 * @LastEditTime: 2022/08/12 16:21
 * @LastEditors: Janaeiw
 * @FilePath: \beautiful-chat-webSocket\public\demo\js\index.js
 * @Description: 'wichat-jssdk'
 */

const origin = '/beautiful-chat-webSocket'

window.onload = function () {
  loadStyle(origin + '/demo/css/iconfont.css')
  loadStyle(origin + '/demo/css/index.css')
  loadScript(origin + '/demo/js/inertia.js')
  loadScript('https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.6.0/jquery.min.js', function () {
    // 初始化加载
    $(function () {
      init();

      function init() {
        makeWiLauncher();
        makeWiIframe();

        $('.wi-open-icon').click(() => {
          // 兼容sdk其他环境下的初始化-不删此代码
          // if(document.getElementsByClassName('wi-iframe').length <= 0){
          //   makeWiIframe()
          // }
          $('.wi-open-icon').hide();
          $('.wi-close-icon').show();
          $('.wi-iframe').show();
          const data = {
            operate: 'openChat',
          };
          IfPostMessage(data);
        });

        $('.wi-close-icon').click(() => {
          $('.wi-open-icon').show();
          $('.wi-close-icon').hide();
          $('.wi-iframe').hide();
        });
      }
    });
  });
};

/**
 * @description: 生成客服窗口触发器
 * @return {*}
 * @Author: Janaeiw
 * @Date: 2022/07/06 15:01
 */
function makeWiLauncher() {
  let launcher = document.createElement('div');
  launcher.className = 'wi-launcher';
  launcher.id = 'ball';
  document.body.appendChild(launcher);
  let iconOpen = document.createElement('i');
  let iconClose = document.createElement('i');
  iconOpen.className = 'wi-open-icon iconfont icon-liaotian';
  iconClose.className = 'wi-close-icon iconfont icon-close';
  iconClose.style.cssText = 'display:none;';
  launcher.appendChild(iconOpen);
  launcher.appendChild(iconClose);
  new Inertia(document.getElementById('ball'));
}

/**
 * @description: 生成iframe窗口
 * @param {*} options
 * @param {*} callback
 * @return {*}
 * @Author: Janaeiw
 * @Date: 2022/07/06 17:32
 */
function makeWiIframe() {
  let iframe = document.createElement('iframe');
  iframe.className = 'wi-iframe animated fadeInUp';
  iframe.src = origin + '/#/home';
  document.body.appendChild(iframe);
  AddEventListener(function (res) {
    const { operate } = res;
    if (operate == 'closeChat') {
      $('.wi-open-icon').show();
      $('.wi-close-icon').hide();
      $('.wi-iframe').hide();
    }
  });
}

/**
 * @description: 父页面向子页面发送数据
 * @param {Object} options
 * @return {*}
 * @Author: Janaeiw
 * @Date: 2022/07/06 17:55
 */
function IfPostMessage(options) {
  window.frames[0].postMessage(options, '*');
}

/**
 * @description: 监听message回调-来自子页面的数据
 * @param {*} callback
 * @return {*}
 * @Author: Janaeiw
 * @Date: 2022/07/06 17:55
 */
function AddEventListener(callback) {
  window.onmessage = function (event) {
    if (event.source === window) return;
    callback && typeof callback === 'function' && callback(event.data);
  };
}

/**
 * @description: 动态创建link标签引入url
 * @param {*} url
 * @return {*}
 * @Author: Janaeiw
 * @Date: 2022/07/06 14:12
 */
function loadStyle(url) {
  let link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

/**
 * @description: 动态创建script标签引入url
 * @param {*} url
 * @param {*} callback
 * @return {*}
 * @Author: Janaeiw
 * @Date: 2022/07/06 13:58
 */
function loadScript(url, callback) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  if (typeof callback != 'undefined') {
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }
  script.src = url;
  document.body.appendChild(script);
}
