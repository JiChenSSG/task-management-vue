<template>
  <div>
    <div class="head">
      <el-page-header @back="goBack" content="管理员管理"> </el-page-header>
    </div>
    <el-row>
      <el-col :offset="1" :span="2">
        <el-button type="success" icon="el-icon-edit" @click="AddFormVisible=true">添加</el-button>
      </el-col>
      <el-col :offset="15" :span="4">
        <el-input v-model="search" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" @click="searchData">搜索</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" prop="id"> </el-table-column>
      <el-table-column label="username" prop="username"> </el-table-column>
      <el-table-column label="password" prop="password"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
    </div>
    <el-dialog title="管理员信息修改" :visible.sync="ChangeFormVisible">
      <el-form :model="changeForm">
        <el-form-item label="用户名">
          <el-input v-model="changeForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="changeForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ChangeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="change()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="管理员信息添加" :visible.sync="AddFormVisible">
      <el-form :model="addForm">
        <el-form-item label="用户名">
          <el-input v-model="addForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "AdminView",
    data() {
      return {
        ChangeFormVisible: false,
        AddFormVisible: false,
        tableData: [],
        search: "",
        changeForm: {
          id: "",
          username: "",
          password: "",
          status: 1,
        },
        addForm: {
          username: "",
          password: "",
          status: 1,
        },
      };
    },
    mounted: function () {
      this.getData("");
    },
    methods: {
      searchData() {
        this.tableData = [];
        this.getData(this.search);
      },
      add() {
        this.$axios({
            method: "post",
            url: "/admin/add",
            data: this.addForm,
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.AddFormVisible = false;
              this.$message({
                message: "添加成功",
                type: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      goBack() {
        this.$router.go(-1);
      },
      handleEdit(index, row) {
        this.changeFormVisible = true;
        this.changeForm.id = row.id;
        this.changeForm.username = row.username;
        this.changeForm.password = row.password;
        console.log(index, row);
      },
      change() {
        this.$axios({
            method: "post",
            url: "/admin/change",
            data: this.changeForm,
          })
          .then((res) => {
            if (res.data.code === 200) {
              this.$message.success("修改成功");
              this.ChangeFormVisible = false;
              this.getData();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        this.ChangeFormVisible = false;
      },
      handleDelete(index, row) {
        this.$axios({
            method: "post",
            url: "/admin/delete",
            data: {
              id: row.id,
            },
          })
          .then((res) => {
            if (res.data.code === 200) {
              this.$message.success("删除成功");
              this.getData();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(index, row);
      },
      getData(username) {
        this.$axios({
            method: "post",
            url: "/admin/get",
            data: {
              pageNum: 0,
              pageSize: 10,
              username: username,
            },
          })
          .then((res) => {
            if (res.data.code === 200) {
              this.tableData = res.data.data;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  };
</script>

<style>
  .head {
    height: 50px;
    line-height: 50px;
    padding: 30px;
    padding-bottom: 10px;
  }
</style>
