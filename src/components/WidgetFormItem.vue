<template>
  <!-- <el-form-item class="widget-view"
      v-if="element && element.key" 
      :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
      :label="element.name"
      @click.native.stop="handleSelectWidget(index)"
    > -->
  <el-form-item class="widget-view"
      v-if="element && element.key" 
      :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
      @click.native.stop="handleSelectWidget(index)"
    >
         <template v-if="element.type == 'label'">
          <!-- <el-input 
            v-model="element.options.defaultValue"
            :style="{width: element.options.width}"
            :placeholder="element.options.placeholder"
          ></el-input> -->
          <div>{{element.name}}</div>
        </template>

        <template v-if="element.type == 'input'">
          <!-- <el-input 
            v-model="element.options.defaultValue"
            :style="{width: element.options.width}"
            :placeholder="element.options.placeholder"
          ></el-input> -->
          <div>{{element.name}}</div>
        </template>

        <template v-if="element.type == 'textarea'">
          <el-input type="textarea" :rows="5"
            v-model="element.options.defaultValue"
            :style="{width: element.options.width}"
            :disabled="element.options.disabled"
            :placeholder="element.options.placeholder"
          ></el-input>
        </template>

        <template v-if="element.type=='blank'">
          <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">自定义区域</div>
        </template>

        <el-button title="删除" @click.stop="handleWidgetDelete(index)" class="widget-action-delete" v-if="selectWidget.key == element.key" circle plain type="danger">
          <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
          <i class="iconfont icon-trash"></i>
        </el-button>
        <el-button title="复制" @click.stop="handleWidgetClone(index)" class="widget-action-clone" v-if="selectWidget.key == element.key" circle plain type="primary">
          <!-- <icon name="icon-icon_clone" style="width: 12px;height: 12px;"></icon> -->
          <i class="iconfont icon-icon_clone"></i>
        </el-button>
        
    </el-form-item>
</template>

<script>
import FmUpload from './Upload'
import FmEditor from './Editor/tinymce'
export default {
  props: ['element', 'select', 'index', 'data'],
  components: {
    FmUpload,
    FmEditor
  },
  data () {
    return {
      selectWidget: this.select
    }
  },
  mounted () {
    console.log(this.element)
  },
  methods: {
    handleSelectWidget (index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetDelete (index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)
      })
    },
    handleWidgetClone (index) {
      let cloneData = {
        ...this.data.list[index],
        options: {...this.data.list[index].options},
        key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      }

      if (this.data.list[index].type === 'radio' || this.data.list[index].type === 'checkbox') {

        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map(item => ({...item}))
          }
        }
      }

      this.data.list.splice(index, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1]
      })
    },
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>
