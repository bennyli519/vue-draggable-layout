export default function (data) {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="https://unpkg.com/form-making/dist/FormMaking.css">
  </head>
  <body>
    <div id="app">
      <fm-generate-form :data="jsonData"  :value="editData" ref="generateForm">
      
      </fm-generate-form>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script src="https://unpkg.com/form-making/dist/FormMaking.umd.js"></script>
    <script>
      new Vue({
        el: '#app',
        data: {
          jsonData: ${data},
          editData: {},
        },
        methods: {
          handleSubmit () {
            this.$refs.generateForm.getData().then(data => {
              // 数据校验成功
              // data 为获取的表单数据
            }).catch(e => {
              // 数据校验失败
            })
          }
        }
      })
    </script>
  </body>
  </html>`
}