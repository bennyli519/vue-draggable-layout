<!--
 * @Description: 
 * @Author: Benny
 * @Date: 2019-08-25 11:12:55
 * @LastEditTime: 2019-09-03 11:07:33
 -->

<template>
  <div>
    <el-form
      v-if="data.list.length>0"
      class="form-style"
      ref="generateForm"
      :size="data.config.size"
      :model="models"
      :rules="rules"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <template v-for="item in data.list">
        <template v-if="item.type == 'grid'">
          <div v-if="item.title">
            <h4>{{item.title}}</h4>
          </div>
          <div v-else></div>
          <el-row
            type="flex"
            v-if="item.options"
            :class="item.options.border.isShow?'row-style':''"
            :key="item.key"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
            :style="{
              borderWidth:(item.options.border.width ? `${item.options.border.width}px`:'1px'),
              borderColor:item.options.border.color 
            }"
          >
            <el-col
              v-for="(col, colIndex) in item.columns" 
              v-if="col.options"
              :key="colIndex" 
              :span="col.span" 
              :style="{
                borderWidth:(col.options.border.width ? `${col.options.border.width}px`:'1px'),
                borderColor:col.options.border.color 
              }"
            >
              <div 
                v-if="col.options"
                :class="col.options.border.isShow?'col-style':'input-container'">
                <template v-for="citem in col.list">
                  <h4 v-if="citem.type == 'title'" class="tablefield">{{citem.name}}</h4>
                  <genetate-form-item
                    v-else
                    :key="citem.key"
                    :models.sync="models"
                    :remote="remote"
                    :rules="rules"
                    :widget="citem"
                  ></genetate-form-item>
                </template>
              </div>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <genetate-form-item
            :key="item.key"
            :models.sync="models"
            :rules="rules"
            :widget="item"
            :remote="remote"
          ></genetate-form-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
import GenetateFormItem from "./GenerateFormItem";

export default {
  name: "fm-generate-form",
  components: {
    GenetateFormItem
  },
  props: ["data", "remote", "value", "insite"],
  data() {
    return {
      models: {},
      rules: {}
    };
  },
  created() {
    this.generateModle(this.data.list);
  },
  mounted() {},
  methods: {
    generateModle(genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === "grid") {
          genList[i].columns.forEach(item => { 
            this.generateModle(item.list);
          });
        } else {
          if (
            this.value &&
            Object.keys(this.value).indexOf(genList[i].model) >= 0
          ) {
            this.models[genList[i].model] = this.value[genList[i].model];
          } else {
            if (genList[i].type === "blank") {
              this.models[genList[i].model] =
                genList[i].options.defaultType === "String"
                  ? ""
                  : genList[i].options.defaultType === "Object"
                  ? {}
                  : [];
            } else {
              this.models[genList[i].model] = genList[i].options.defaultValue;
            }
          }
        }
      }
    },
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.generateModle(val.list);
      }
    },
    value: {
      deep: true,
      handler(val) {
        console.log(JSON.stringify(val));
        this.models = { ...this.models, ...val };
      }
    }
  }
};
</script>

<style lang="scss">
  .form-style{
    padding:0 10px;
  }
  .row-style{
    margin: 0 !important;
    padding:10px;
    border:1px solid #eee;
    border-radius: 4px;
  }
  .col-style{
    padding:10px;
    border:1px solid #eee;
    border-radius: 4px;
  }
</style>
