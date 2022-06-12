<template>
  <div>
    <el-row class="tac">
      <el-col :span="3">
        <h5>学生管理系统</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :router="true"
        >
          <el-menu-item index="/index/admin">
            <i class="el-icon-setting"></i>
            <span slot="title">管理员设置</span>
          </el-menu-item>
          <el-menu-item index="/index/student">
            <i class="el-icon-setting"></i>
            <span slot="title">学生管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <router-view> </router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
</style>