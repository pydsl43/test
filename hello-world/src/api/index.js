/*
* @Author: fredlee
* @Date:   2017-10-12 15:15:57
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-18 13:33:04
*/

import Vue from 'vue'

const vm = new Vue()
const zbt = "https://www.zbt.com/api"

function getArticalList (params) {
  return vm.$http.get(zbt + '/v1/community/article/lst', {params: params})
}

export default {
    getArticalList,

}

  