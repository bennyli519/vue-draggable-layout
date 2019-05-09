<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <el-aside style="wdith: 250px;">
          <div class="components-list">
            <!-- 布局 -->
            <div class="widget-cate">布局设置</div>
            <draggable
              tag="ul"
              :list="layoutComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @start="handleMoveStart"
              :move="handleMove"
              @end="handleMoveEnd"
            >
              <li
                class="form-edit-widget-label data-grid"
                v-for="(item, index) in layoutComponents"
                :key="index"
              >
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
            <!-- 基础 -->
            <div class="widget-cate">基础字段</div>
            <draggable
              tag="ul"
              :list="basicComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @start="handleMoveStart"
              :move="handleMove"
              @end="handleMoveEnd"
            >
              <li
                class="form-edit-widget-label"
                v-for="(item, index) in basicComponents"
                :key="index"
              >
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
            <!-- 字段名 -->
            <div class="widget-cate">数据库表字段</div>
            <draggable
              tag="ul"
              :list="labelList"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @start="handleMoveStart"
              :move="handleMove"
              @end="handleMoveEnd"
            >
              <li
                class="form-edit-widget-label"
                v-for="(item, index) in labelList"
                :key="index"
              >
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
            <slot name="action"></slot>
            <el-button
              v-if="preview"
              type="text"
              size="medium"
              icon="el-icon-view"
              @click="handlePreview"
            >预览</el-button>
            <el-button
              v-if="generateCode"
              type="text"
              size="medium"
              icon="el-icon-document"
              @click="handleGenerateCode"
            >生成代码</el-button>
          </el-header>
          <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
            <widget-form ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
          </el-main>
        </el-container>

        <el-aside class="widget-config-container">
          <el-container>
            <el-header height="45px">
              <div
                class="config-tab"
                :class="{active: configTab=='widget'}"
                @click="handleConfigSelect('widget')"
              >字段属性</div>
              <div
                class="config-tab"
                :class="{active: configTab=='form'}"
                @click="handleConfigSelect('form')"
              >表单属性</div>
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
          <generate-form
            insite="true"
            v-if="previewVisible"
            :data="widgetForm"
            :value="widgetModels"
            ref="generateForm"
          ></generate-form>
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
import Draggable from "vuedraggable";
import WidgetConfig from "./WidgetConfig";
import FormConfig from "./FormConfig";
import WidgetForm from "./WidgetForm";
import CusDialog from "./CusDialog";
import GenerateForm from "./GenerateForm";
import Clipboard from "clipboard";
import {
  basicComponents,
  labelList,
  layoutComponents,
  panel
} from "./componentsConfig.js";
import { loadJs, loadCss } from "../util/index.js";
import request from "../util/request.js";
import generateCode from "./generateCode.js";

export default {
  name: "fm-making-form",
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
  data() {
    return {
      basicComponents,
      layoutComponents,
      labelList,
      panel,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: "top",
          size: "small"
        }
      },
      configTab: "widget",
      widgetFormSelect: null,
      previewVisible: false,
      codeVisible: false,
      widgetModels: {},
      blank: "",
      htmlTemplate: "",
      jsonTemplate: "",
      uploadEditor: null,

    };
  },
  mounted() {
 
  },
  methods: {
    handleConfigSelect(value) {
      this.configTab = value;
    },
    handleMoveEnd(evt) {
      console.log("拖动结束", evt);
    },
    handleMoveStart({ oldIndex }) {
      console.log("开始拖动", oldIndex);
    },
    handleMove() {
      return true;
    },
    handlePreview() {
      this.previewVisible = true;
    },
    handleTest() {
      this.$refs.generateForm
        .getData()
        .then(data => {
          this.$alert(data, "").catch(e => {});
          this.$refs.widgetPreview.end();
        })
        .catch(e => {
          this.$refs.widgetPreview.end();
        });
    },

    handleGenerateCode() {
      this.codeVisible = true;
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm));
      this.$nextTick(() => {
        const editor = ace.edit("codeeditor");
        editor.session.setMode("ace/mode/html");
      });
    },
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function(val) {
        console.log(val)
      }
    }
  }
};
</script>

<style lang="scss">
.widget-empty {
  background: url("../assets/form_empty.png") no-repeat;
  background-position: 50%;
}
</style>
