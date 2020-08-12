import "@/engine-components/lib/engine-components.css";
import "@/engine-components/style/index.css";
import "@/icons";
import "@/styles/index.scss";
import "@/styles/var.css";

import Vue from "vue";

import CodeSetter from "@/components/editor";
import TextSetter from "@/components/text";
import Tinymce from "@/components/tinymce/index.vue";
import {
  ProTable,
  VCContainer,
  VCText
} from "@/engine-components/lib/engine-components.umd.js";
import router from "@/router";

import App from "./App.vue";

Vue.component('tinymce', Tinymce)

Vue.component('vc-container', VCContainer)

Vue.component('vc-text', VCText)

Vue.component('CodeSetter', CodeSetter)

Vue.component('TextSetter', TextSetter)

Vue.component('ProTable', ProTable)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
window.MonacoEnvironment = {
  getWorkerUrl(workerId, label) {
    return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
              self.MonacoEnvironment = {
                baseUrl: '${window.location.protocol}//cdn-service.datav.aliyun.com/datav-static/2.36.2_1/libs/monaco-editor/'
              };
              importScripts('${window.location.protocol}//cdn-service.datav.aliyun.com/datav-static/2.36.2_1/libs/monaco-editor/vs/base/worker/workerMain.js');`)}`
  }
}
