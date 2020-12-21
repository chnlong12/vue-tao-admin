<template>
  <div class='page-content'>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input placeholder="请输入用户名搜索"></el-input>
      </el-col>
      <el-button>搜索</el-button>
    </el-row>
    <tao-table :defaultData="true" style="margin-top: 15px">
      <el-table-column label="用户名" prop="default"/>
      <el-table-column label="ip" prop="default"/>
      <el-table-column label="ip来源" prop="default"/>
      <el-table-column label="描述" prop="default"/>
      <el-table-column label="浏览器" prop="default"/>
      <el-table-column label="请求耗时" prop="default"/>
      <el-table-column label="日期" prop="default"/>
    </tao-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      };
    },
    mounted() {},
    methods: {},
  }
</script>

<style lang='scss' scoped>
  .page-content {
    width: 100%;
    height: 100%;
  }
</style>