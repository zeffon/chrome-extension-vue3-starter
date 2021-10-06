/*
 * @Description: Vue组件转为真实dom
 * @Author: Zeffon
 * @Date: 2021-10-05 09:34:09
 * @LastEditors: Zeffon
 * @LastEditTime: 2021-10-06 13:51:00
 */
import { App, Component, createApp } from 'vue'

/**
 * 将vue组件插入到页面上
 * @param {object} component 			组件
 * @param {string} insertSelector  插入选择器
 */
function insert(component: Component, insertSelector = 'body') {
  insertDomFactory(component, insertSelector)
}

// 根据组件生成vue实例
// 生成插入的dom
function insertDomFactory(component: Component, insertSelector: string) {
  const vm = generateInstance(component)

  generateInsertDom(insertSelector, vm)
}

// 遍历待插入的dom
// 插入新创建的元素
// 将vue实例挂载到新创建的元素上
function generateInsertDom(insertSelector: string, vm: App<Element>) {
  const dom = document.querySelectorAll(insertSelector)
  dom.forEach((item) => {
    const insert = document.createElement('div')
    insert.id = 'insert-item'
    item.appendChild(insert)
    vm.mount('#insert-item')
  })
}

function generateInstance(component: Component) {
  const app = createApp(component)
  return app
}

export default insert
