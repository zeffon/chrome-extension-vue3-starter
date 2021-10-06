/*
 * @Description:
 * @Author: Zeffon
 * @Date: 2021-10-05 09:31:46
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-06 14:42:35
 */
/// <reference types="chrome"/>

import App from './views/App.vue'
import insert from '@/utils/insert'

// 注入js到页面
injectJS()

// 插入组件到页面中
insert(App)

function injectJS() {
  document.addEventListener('readystatechange', () => {
    const injectPath = 'inject.js'
    const temp = document.createElement('script')

    temp.setAttribute('type', 'text/javascript')
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(injectPath)
    document.body.appendChild(temp)
  })
}
