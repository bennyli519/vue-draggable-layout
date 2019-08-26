<!--
 * @Description: 
 * @Author: Benny
 * @Date: 2019-08-25 11:12:55
 * @LastEditTime: 2019-08-26 18:21:18
 -->
<template>
  <!-- <el-form-item class="adsfasdfas" :label="widget.name+'1231'" :prop="widget.model">
    <template v-if="widget.type == 'input'">
      <el-input
        v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
        :type="widget.options.dataType"
        v-model.number="dataModel"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
      ></el-input>
      <el-input
        v-else
        :type="widget.options.dataType"
        v-model="dataModel"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input
        type="textarea"
        :rows="5"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
      ></el-input>
    </template>
  </el-form-item> -->
  <div class="input-wrapper">
    <div class="tablefield">{{widget.name}}</div>
  </div>
</template>
<style lang="scss" scoped>
  .input-wrapper{
    padding: 10px 0;
  }
</style>
<script>
export default {
  props: ["widget", "models", "rules", "remote"],
  data() {
    return {
      dataModel: this.models[this.widget.model]
    };
  },
  created() {},
  methods: {},
  watch: {
    dataModel: {
      deep: true,
      handler(val) {
        this.models[this.widget.model] = val;
        this.$emit("update:models", {
          ...this.models,
          [this.widget.model]: val
        });
      }
    },
    models: {
      deep: true,
      handler(val) {
        this.dataModel = val[this.widget.model];
      }
    }
  }
};
</script>
