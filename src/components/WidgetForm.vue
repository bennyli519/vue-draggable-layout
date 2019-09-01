<!--
 * @Description: 
 * @Author: Benny
 * @Date: 2019-08-25 11:12:55
 * @LastEditTime: 2019-09-01 13:41:19
 -->
<template>
  <div class="widget-form-container">
    <el-form
      :size="data.config.size"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <draggable
        class="widget-form-container"
        v-model="data.list"
        v-bind="{group:'people',ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
      >
        <template v-for="(element, index) in data.list">
          <template v-if="element.type == 'grid'">
            <div
              v-if="element && element.key"
              class="widget-grid-container data-grid"
              :key="element.key"
              style="position: relative;"
            >
              <h4 class="title-style">{{element.title}}</h4>
              <el-row
                class="widget-grid"
                type="flex"
                :class="{active: selectWidget.key == element.key}"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                :align="element.options.align"
                @click.native="handleSelectWidget(index)"
              >
                <el-col
                  style="position: relative;"
                  v-if="col.key"
                  :key="col.key"
                  v-for="(col, colIndex) in element.columns"
                  :span="col.span ? col.span : 0"
                  :class="{active: selectWidget.key == col.key}"
                >
                  <draggable
                    class="panel-style"
                    v-model="col.list"
                    filter="widget-grid-container"
                    v-bind="{group:'people',ghostClass: 'ghost'}"
                    @end="handleMoveEnd"
                    @add="handleWidgetColAdd($event, element, colIndex)"
                    @click.native.stop="handleSelectCol(col,colIndex)"
                  >
                    <widget-form-item
                      v-for="(el, i) in col.list"
                      :key="el.key"
                      v-if="el.key"
                      :element="el"
                      :select.sync="selectWidget"
                      :index="i"
                      :data="col"
                    ></widget-form-item>
                  </draggable>
                  <el-button
                    title="删除"
                    @click.stop="handleWidgetColDelete(index,element,colIndex)"
                    class="btn-style"
                    v-if="selectWidget.key == col.key"
                    circle
                    plain
                    type="danger"
                  >
                    <i class="iconfont icon-trash"></i>
              </el-button>
                </el-col>
              </el-row>
              <el-button
                title="删除"
                @click.stop="handleWidgetDelete(index)"
                class="widget-action-delete btn-style"
                v-if="selectWidget.key == element.key"
                circle
                plain
                type="danger"
              >
                <i class="iconfont icon-trash"></i>
              </el-button>
            </div>
          </template>
        </template>
      </draggable>
    </el-form>
  </div>
</template>

<style lang="scss">

.btn-style {
  position: absolute;
  bottom: -20px;
  right: 0;
}
</style>

<script>
import Draggable from "vuedraggable";
import WidgetFormItem from "./WidgetFormItem";

export default {
  components: {
    Draggable,
    WidgetFormItem
  },
  props: ["data", "select"],
  data() {
    return {
      selectWidget: this.select,
      colOption:{
        border:{
          isShow:false,
          width:1,
          color:'#eee',
        } 
       },
    };
  },
  created(){

  },
  mounted() {
    document.body.ondrop = function(event) {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      if (isFirefox) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
  },
  methods: {
    handleMoveEnd({ newIndex, oldIndex }) {
    },
    //选择行
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index];
    },
   //选择列
    handleSelectCol(col,colIndex) {
      this.selectWidget = col;
      console.log(this.selectWidget)
    },
    //添加布局
    handleWidgetAdd(evt) {
      const newIndex = evt.newIndex;
      const item = evt.item;
      //为拖拽到容器的元素添加唯一 key
      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: JSON.parse(JSON.stringify(this.data.list[newIndex].options)),
        key,
        // 绑定键值
        model: this.data.list[newIndex].type + "_" + key,
        rules: []
      });

      //防止数据重复
      if (this.data.list[newIndex].type === "grid") {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map((item,index) => (
              { ...item,
                key:(key + index),
                options:JSON.parse(JSON.stringify(this.colOption))
            
              }
            )
          )
        });
      }
      console.log(this.data.list)
      //保证字段等元素在布局容器内布局
      if (item.className.indexOf("data-grid") < 0) {
        alert('字段只能放容器里面哦～')
        this.data.list.splice(newIndex, 1);
        return false;
      }
      this.selectWidget = this.data.list[newIndex];
    },

    //列添加内容
    handleWidgetColAdd($event, row, colIndex) {
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;

      //防止布局元素的嵌套拖拽
      if (item.className.indexOf("data-grid") >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === "DIV" &&
          row.columns[colIndex].list.splice(
            oldIndex,
            0,
            row.columns[colIndex].list[newIndex]
          );

        row.columns[colIndex].list.splice(newIndex, 1);

        return false;
      }

      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options
        },
        key,
        // 绑定键值
        model: row.columns[colIndex].list[newIndex].type + "_" + key,
        rules: []
      });

      this.selectWidget = row.columns[colIndex].list[newIndex];
    },
    //col列删除
    handleWidgetColDelete(index,element,colIndex){
      //如果只有一列
      if (element.columns.length - 1 === colIndex) {
        if (colIndex === 0) {
          this.selectWidget = {}; 
          this.data.list[index] = {};
        } else {
          this.selectWidget = element.columns[colIndex - 1];
        }
      } else {
        this.selectWidget = element.columns[colIndex + 1];
      }
      //移除选中的那一列col
      this.$nextTick(() => {
        element.columns.splice(colIndex, 1);
      });
      console.log(this.data.list)
    },
    //row行删除
    handleWidgetDelete(index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.list[index - 1];
        }
      } else {
        this.selectWidget = this.data.list[index + 1];
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1);
      });
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit("update:select", val);
      },
      deep: true
    }
  }
};
</script>
