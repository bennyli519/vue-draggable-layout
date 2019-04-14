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
        v-bind="{group:'people', ghostClass: 'ghost'}"
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
                  v-for="(col, colIndex) in element.columns"
                  :key="colIndex"
                  :span="col.span ? col.span : 0"
                >
                  <draggable
                    class="panel-style"
                    :list="col.list"
                    v-model="col.list"
                    filter="widget-grid-container"
                    v-bind="{group:'people',sort:false, ghostClass: 'ghost'}"
                    @end="handleMoveEnd"
                    @add="handleWidgetColAdd($event, element, colIndex)"
                  >
                    <div v-for="(el, i) in col.list" v-if="el.type == 'title'" :key="i">
                      <h4>{{el.name}}</h4>
                    </div>
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
                </el-col>
              </el-row>
              <el-button
                title="删除"
                style="bottom: -20px;"
                @click.stop="handleWidgetDelete(index)"
                class="widget-action-delete"
                v-if="selectWidget.key == element.key"
                circle
                plain
                type="danger"
              >
                <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
                <i class="iconfont icon-trash"></i>
              </el-button>
            </div>
          </template>
        </template>
      </draggable>
    </el-form>
  </div>
</template>

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
      selectWidget: this.select
    };
  },
  mounted() {
    console.log(this.data);
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
      console.log("Move结束", newIndex, oldIndex);
    },
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index];
    },
    handleWidgetAdd(evt) {
      console.log("add", evt);
      console.log("end", evt);
      const newIndex = evt.newIndex;
      const to = evt.to;

      //为拖拽到容器的元素添加唯一 key
      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options,
          remoteFunc: "func_" + key
        },
        key,
        // 绑定键值
        model: this.data.list[newIndex].type + "_" + key,
        rules: []
      });
      if (this.data.list[newIndex].type === "grid") {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map(item => ({ ...item }))
        });
      }

      this.selectWidget = this.data.list[newIndex];
    },
    handleWidgetColAdd($event, row, colIndex) {
      console.log("列添加内容:", $event, row, colIndex);
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;

      // 防止布局元素的嵌套拖拽
      // if (item.className.indexOf("data-grid") >= 0) {
      //   // 如果是列表中拖拽的元素需要还原到原来位置
      //   item.tagName === "DIV" &&
      //     this.data.list.splice(
      //       oldIndex,
      //       0,
      //       row.columns[colIndex].list[newIndex]
      //     );

      //   row.columns[colIndex].list.splice(newIndex, 1);

      //   return false;
      // }

      console.log("来自：", item);

      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options,
          remoteFunc: "func_" + key
        },
        key,
        // 绑定键值
        model: row.columns[colIndex].list[newIndex].type + "_" + key,
        rules: []
      });

      this.selectWidget = row.columns[colIndex].list[newIndex];
    },
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
