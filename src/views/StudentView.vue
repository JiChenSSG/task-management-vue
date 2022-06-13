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
    <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'name', order: 'ascending'}" @sort-change="handleSortChange">
      <el-table-column label="ID" prop="id" sortable> </el-table-column>
      <el-table-column label="name" prop="name" sortable> </el-table-column>
      <el-table-column label="age" prop="age" sortable> </el-table-column>
      <el-table-column label="sex" prop="sex" sortable> </el-table-column>
      <el-table-column label="grade" prop="grade" sortable> </el-table-column>
      <el-table-column label="city" prop="city"> </el-table-column>

      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">Details</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
    </div>
    <el-dialog title="学生信息修改" :visible.sync="ChangeFormVisible">
      <el-form :model="changeForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="changeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="changeForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="changeForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="changeForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="city">
          <el-input v-model="changeForm.city"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ChangeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="change()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="学生信息添加" :visible.sync="AddFormVisible">
      <el-form :model="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="addForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="city">
          <el-input v-model="addForm.city"></el-input>
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
    name: "StudentView",
    data() {
      return {
        ChangeFormVisible: false,
        AddFormVisible: false,
        tableData: [],
        sortProp: 'id',
        sortOrder: 'false',
        search: "",
        changeForm: {
          id: "",
          name: "",
          age: "",
          sex: "",
          city: "",
          status: 1,
        },
        addForm: {
          name: "",
          age: "",
          sex: "",
          city: "",
          status: 1
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
            url: "/student/add",
            data: this.addForm,
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.AddFormVisible = false;
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.getData("");
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
        this.ChangeFormVisible = true;

        this.changeForm.id = row.id
        this.changeForm.name = row.name
        this.changeForm.age = row.age
        this.changeForm.sex = row.sex
        this.changeForm.grade = row.grade
        this.changeForm.city = row.city

        console.log(index, row);
      },
      change() {
        this.$axios({
            method: "post",
            url: "/student/change",
            data: this.changeForm,
          })
          .then((res) => {
            if (res.data.code === 200) {
              this.$message.success("修改成功");
              this.ChangeFormVisible = false;
              this.getData("");
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
            url: "/student/delete",
            data: {
              id: row.id,
            },
          })
          .then((res) => {
            if (res.data.code === 200) {
              this.$message.success("删除成功");
              this.getData("");
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(index, row);
      },
      getData(name) {
        this.$axios({
            method: "post",
            url: "/student/get",
            data: {
              pageNum: 0,
              pageSize: 10,
              name: name,
              desc: this.sortOrder,
              order: this.sortProp
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

      handleSortChange(val) {
        if (val.column) {
          this.sortProp = val.prop;
          this.sortOrder = val.order == 'ascending' ? false : true;
        }

        this.getData(this.search);
      }
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