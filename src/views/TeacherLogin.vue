<template>
  <div id="app">
    <el-row>
      <el-button type="primary" @click="switchStudent">学生登录</el-button>
      <el-button type="primary" @click="switchAdmin">管理员登录</el-button>
    </el-row>
    <el-form ref="form" :model="LoginForm" label-width="80px">
      <div class="title">教师登录</div>
      <el-form-item label="用户名">
        <el-input
          v-model="LoginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="LoginForm.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "TeacherLogin",
  data() {
    return {
      LoginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$axios({
        method: "post",
        url: "/Teacher/login",
        data: this.LoginForm,
      })
        .then((res) => {
          if (res.data.code === 200) {
            this.$message.success("登录成功");
            this.$router.push("/Teacher/index");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    switchStudent() {
      this.$router.push("/student/login");
    },
    switchAdmin() {
      this.$router.push("/admin/login");
    },
  },
};
</script>

<style>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 40px;
}

.el-form {
  width: 400px;
  margin: 0 auto;
  margin-top: 300px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-form-item .el-input {
  width: 100%;
}
</style>