<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <el-aside style="wdith: 250px;">

          <div class="components-list">
             <!-- 布局 -->
            <!-- <div class="widget-cate">面板列</div>
            <draggable tag="ul" :list="panel" 
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @start="handleMoveStart"
              :move="handleMove"
              @end="handleMoveEnd"
            >
              <li class="form-edit-widget-label data-grid" v-for="(item, index) in panel" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable> -->
            <!-- 布局 -->
            <div class="widget-cate">布局设置</div>
            <draggable tag="ul" :list="layoutComponents" 
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @start="handleMoveStart"
              :move="handleMove"
              @end="handleMoveEnd"
            >
              
              <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
            <!-- 基础 -->
            <div class="widget-cate">基础字段</div>
            <draggable tag="ul" :list="basicComponents" 
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @start="handleMoveStart"
              :move="handleMove"
              @end="handleMoveEnd"
            >
              
              <li class="form-edit-widget-label" v-for="(item, index) in basicComponents" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
            <!-- 字段名 -->
            <div class="widget-cate">xx表字段</div>
            <draggable tag="ul" :list="labelList" 
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:true, ghostClass: 'ghost'}"
              @start="handleMoveStart"
              :move="handleMove"
              @end="handleMoveEnd"
            >
              
              <li class="form-edit-widget-label data-grid" v-for="(item, index) in labelList" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
          </div>
          
        </el-aside>
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <slot name="action">
            </slot>
            <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">导入JSON</el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
            <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">生成JSON</el-button>
            <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button>
          </el-header>
          <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
            <widget-form ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
            <!-- <generate-form insite="true":data="widgetForm" :value="widgetModels" :remote="remoteFuncs" ref="generateForm"/> -->
          </el-main>
        </el-container>
        
        <el-aside class="widget-config-container">
          <el-container>
            <el-header height="45px">
              <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
              <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
            </el-header>
            <el-main class="config-content">
              <widget-config v-show="configTab=='widget'" :data="widgetFormSelect"></widget-config>
              <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
            </el-main>
          </el-container>
          
        </el-aside>

        <cus-dialog
          :visible="previewVisible"
          @on-close="previewVisible = false"
          ref="widgetPreview"
          @on-submit="handleTest"
          width="1000px"
          form
        >
          <generate-form insite="true" v-if="previewVisible" :data="widgetForm" :value="widgetModels" :remote="remoteFuncs" ref="generateForm">

            <template v-slot:blank="scope">
              宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
              高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
          </generate-form>
        </cus-dialog>

        <cus-dialog
          :visible="uploadVisible"
          @on-close="uploadVisible = false"
          @on-submit="handleUploadJson"
          ref="uploadJson"
          width="800px"
          form
        >
          <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"></el-alert>
          <div id="uploadeditor" style="height: 400px;width: 100%;">{{jsonEg}}</div>
        </cus-dialog>

        <cus-dialog
          :visible="jsonVisible"
          @on-close="jsonVisible = false"
          ref="jsonPreview"
          width="800px"
          form
        >
          
          <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>
          
          <template slot="action">
            <el-button id="copybtn" data-clipboard-target=".ace_text-input">双击复制</el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          :visible="codeVisible"
          @on-close="codeVisible = false"
          ref="codePreview"
          width="800px"
          form
          :action="false"
        >
          <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
        </cus-dialog>
      </el-container>
    </el-main>
    <!-- <el-footer height="30px">Forked by <a target="_blank" href="#"></a></el-footer> -->
  </el-container>
  
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import Clipboard from 'clipboard'
import { basicComponents,labelList,layoutComponents,panel} from './componentsConfig.js'
import {loadJs, loadCss} from '../util/index.js'
import request from '../util/request.js'
import generateCode from './generateCode.js'


export default {
  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm
  },
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    generateCode: {
      type: Boolean,
      default: false
    },
    generateJson: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean, 
      default: false
    }
  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      labelList,
      panel,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'top',
          size: 'small'
        },
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      remoteFuncs: {
        func_test (resolve) {
          setTimeout(() => {
            const options = [
              {id: '1', name: '1111'},
              {id: '2', name: '2222'},
              {id: '3', name: '3333'}
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken (resolve) {
          request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        },
        upload_callback (response, file, fileList) {
          console.log('callback', response, file, fileList)
        }
      },
      widgetModels: {
      },
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonEg: `{
  "list": [
    {
      "type": "input",
      "name": "单行文本",
      "icon": "icon-input",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908864000_94322"
      },
      "key": "1540908864000_94322",
      "model": "input_1540908864000_94322",
      "rules": [
        {
          "type": "string",
          "message": "单行文本格式不正确"
        }
      ]
    },
    {
      "type": "textarea",
      "name": "多行文本",
      "icon": "icon-diy-com-textarea",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908876000_19435"
      },
      "key": "1540908876000_19435",
      "model": "textarea_1540908876000_19435",
      "rules": []
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
}`
    }
  },
  mounted () {
    console.log(this.labelList)
  },
  methods: {
    handleGoGithub () {
      window.location.href = 'https://github.com/GavinZhuLei/vue-form-making'
    },
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
      console.log('拖动结束', evt)
    },
    handleMoveStart ({oldIndex}) {
      console.log('开始拖动', oldIndex)
      // console.log('开始拖动', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    handlePreview () {
      console.log(this.widgetForm)
      this.previewVisible = true
    },
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e=>{})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleGenerateJson () {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      console.log(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {

        const editor = ace.edit('jsoneditor')
        editor.session.setMode("ace/mode/json")

        const btnCopy = new Clipboard('#copybtn')
      })
    },
    handleGenerateCode () {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode("ace/mode/html")
      })
    },
    handleUpload () {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.uploadEditor = ace.edit('uploadeditor')
        this.uploadEditor.session.setMode("ace/mode/json")
      })
    },
    handleUploadJson () {
      try {
        this.setJSON(JSON.parse(this.uploadEditor.getValue()))
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    getJSON () {
      return this.widgetForm
    },
    getHtml () {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    setJSON (json) {
      this.widgetForm = json

      if (json.list.length> 0) {
        this.widgetFormSelect = json.list[0]
      }
    },
    handleInput (val) {
      console.log(val)
      this.blank = val
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        console.log(this.$refs.widgetForm)
      }
    }
  }
}
</script>

<style lang="scss">
.widget-empty{
  background: url('../assets/form_empty.png') no-repeat;
  background-position: 50%;
}

</style>
