
<template>
  <div>
    <div class="head">
      <el-page-header @back="goBack" content="考试管理"> </el-page-header>
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
      <el-table-column label="date" prop="age" sortable> </el-table-column>

      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">Details</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
    </div>
    <el-dialog title="考试信息添加" :visible.sync="AddFormVisible">
      <el-form :model="addForm">
        <el-form-item label="考试名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="考试时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期时间" v-model="addForm.date" value-format="yyyy-MM-dd"></el-date-picker>
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
    name: "taskView",
    data() {
      return {
        AddFormVisible: false,
        tableData: [],
        sortProp: 'id',
        sortOrder: 'false',
        search: "",
        addForm: {
          name: "",
          date: "",
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
            url: "/task/add",
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
      change() {
        this.$axios({
            method: "post",
            url: "/task/change",
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
            url: "/task/delete",
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
            url: "/task/get",
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