<template>
  <div class='page-content'>
    <div class="department">
      <div class="left-wrap tree">
        <el-row style="display: flex">
          <el-input placeholder="部门名称" style="width: 195px; margin-right: 8px"></el-input>
          <el-button class="el-icon-plus"> 添加</el-button>
        </el-row>
        <div class="line"></div>
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          @check-change="handleCheckChange"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
              <i class="icon iconfont">{{node.level === 1 ? '&#xe6d8;' : '&#xe633;'}}</i>
              {{ data.name }}
            </span>
            <i class="btn iconfont">
              &#xe6b1;
              <ul @click.stop="">
                <li>新增子部门</li>
                <li>重命名</li>
                <li>子部门排序</li>
                <li>删除部门</li>
              </ul>
            </i>
          </span>
        </el-tree>
      </div>
      <div class="right-wrap">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input placeholder="用户名或昵称"></el-input>
          </el-col>
          <el-button>搜索</el-button>
          <el-button @click="showDialog('add')">新增</el-button>
        </el-row>
        <tao-table style="margin-top: 15px" height="75.5vh">
          <el-table-column label="账号" prop="default"/>
          <el-table-column label="姓名" prop="default"/>
          <el-table-column label="部门" prop="default"/>
          <el-table-column label="角色" prop="default"/>
          <el-table-column label="状态" prop="default">
            <template>
              <el-tag :type="'success'">
                {{'启用'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="default"/>
          <el-table-column fixed="right" label="操作" width="150px">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="showDialog('edit')">
                编辑
              </el-button>
              <el-button type="text" style="color: #FA6962" icon="el-icon-delete" @click="deleteUser(scope)">
                注销
              </el-button>
            </template>
          </el-table-column>
        </tao-table>
      </div>
    </div>
    
    <el-dialog :title="dialogTitle" width="500px" :visible.sync="dvEdit">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.mibile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="form.dep" placeholder="请选择部门">
            <el-option label="人事部" value="shanghai"></el-option>
            <el-option label="开发部" value="beijing"></el-option>
            <el-option label="测试部" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dvEdit = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dvEdit: false,
        dialogTitle: '',
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1,
        form: {
          username: '',
          mibile: '',
          email: '',
          sex: 1,
          dep: '',
          status: true
        },
      };
    },
    mounted() {
      
    },
    methods: {
      showDialog(type) {
        this.dvEdit = true
        this.dialogTitle = type === 'add' ? '新增用户' : '编辑用户'
      },
      onSubmit() {
        this.dvEdit = false
      },
      handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        // console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([
            { name: '人力资源部' },
            { name: '公关部' },
            { name: '市场部' },
            { name: '财务部' },
            { name: '广告部' },
            { name: '计划营销部' },
            { name: '开发部' },
            { name: '测试部' },
            { name: '安全监察部' },
            { name: '设计部' },
            { name: '监事会' },
            { name: '董事会' },
          ]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      },
      deleteUser(scope) {
        this.$confirm('您确定要注销当前用户吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.userList.splice(scope.$index, 1)
        }).catch(() => {})
      }
    },
  }
</script>

<style lang='scss' scoped>
  @import "@css/tree.scss";

  .page-content {
    width: 100%;
    height: 100%;

    .department {
      display: flex;

      .left-wrap {
        width: 300px;

        .line {
          margin: 15px 0;
        }
      }

      .right-wrap {
        flex: 1;
      }
    }
  }
</style>