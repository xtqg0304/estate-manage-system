<template>
  <div class="app-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span> 基本信息</span>
            <span class="pullRight">
                <i class="el-icon-edit">修改</i>
                <i class="el-icon-document">保存</i>
                <i class="el-icon-close">取消</i>
            </span>
        </div>
        <div class="component-item">
            <el-form  label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="集团编码">
                            G003
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属城市">
                            <el-cascader
                                :options="options"
                                placeholder="请选择所属城市"
                                class="filter-item"
                                expand-trigger="hover" style="width: 100%;"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="集团简称">
                        <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="总部地址">
                        <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="邮编">
                        <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="集团全名">
                        <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系人">
                        <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话">
                        <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="8">
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <el-button>取消</el-button>
                    </el-col> -->
                </el-row>
            </el-form>
            <el-form  label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="集团编码">
                            G003
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属城市">
                            福建省/福州市/闽侯
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="集团简称">
                        我家物业
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="总部地址">
                        福州
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="邮编">
                        350000
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="集团全名">
                        我家物业
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系人">
                        福州
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话">
                        350000
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </el-card>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span> 页面设置 </span>
            <span class="pullRight">
                <i class="el-icon-edit">修改</i>
                <i class="el-icon-document">保存</i>
                <i class="el-icon-close">取消</i>
            </span>
        </div>
        <div class="component-item">
            <el-form  label-width="80px">
                <el-form-item label="集团logo">
                    <img src="../../../assets/images/logo.png">
                </el-form-item>
                <el-form-item label="集团图标">
                    <img src="../../../assets/images/logo.png">
                </el-form-item>
            </el-form>
            <el-form  label-width="80px">
                <el-form-item label="集团logo">
                    <Upload v-model="temp.uploadimg" />
                </el-form-item>
                <el-form-item label="集团图标">
                    <Upload v-model="temp.uploadimg" />
                </el-form-item>
            </el-form>
        </div>
    </el-card>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span> 系统管理员 </span>
        </div>
        <div class="component-item">
          <div class="icon-item">
            <i class="el-icon-close"></i>
            <p>
              <svg-icon icon-class="user" />
              <span>张华</span>
            </p>
            <p>
              <svg-icon icon-class="phone" />
              <span>17777778828 </span>
            </p>

          </div>
           <div class="icon-item">
            <i class="el-icon-close"></i>
            <p>
              <svg-icon icon-class="user" />
              <span>张华</span>
            </p>
            <p>
              <svg-icon icon-class="phone" />
              <span>17777778828 </span>
            </p>

          </div>
           <div class="icon-item">
            <i class="el-icon-close"></i>
            <p>
              <svg-icon icon-class="user" />
              <span>张华</span>
            </p>
            <p>
              <svg-icon icon-class="phone" />
              <span>17777778828 </span>
            </p>

          </div>
        </div>
    </el-card>
  </div>
</template>
<script>
import {
  fetchList
} from '@/api/estatePaybill'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import Upload from '@/components/Upload/singleImage3'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: { Upload },
  data() {
    return {
      form: undefined,
      options: [
        {
          value: 'B1',
          label: 'B1座',
          children: [
            {
              value: '01',
              label: '01单元',
              children: [{
                value: '0101',
                label: '0101'
              },
              {
                value: '0102',
                label: '0102'
              },
              {
                value: '0103',
                label: '0103'
              },
              {
                value: '0104',
                label: '0104'
              }
              ]
            },
            {
              value: '02',
              label: '02单元',
              children: [{
                value: '0201',
                label: '0201'
              }, {
                value: '0202',
                label: '0202'
              }]
            }
          ]
        },
        {
          value: 'B2',
          label: 'B2座',
          children: [
            {
              value: '01',
              label: '01单元',
              children: [{
                value: '0101',
                label: '0101'
              },
              {
                value: '0102',
                label: '0102'
              },
              {
                value: '0103',
                label: '0103'
              },
              {
                value: '0104',
                label: '0104'
              }
              ]
            },
            {
              value: '02',
              label: '02单元',
              children: [{
                value: '0201',
                label: '0201'
              }, {
                value: '0202',
                label: '0202'
              }]
            }
          ]
        },
        {
          value: 'C1',
          label: 'C1座',
          children: [
            {
              value: '01',
              label: '01单元',
              children: [{
                value: '0101',
                label: '0101'
              },
              {
                value: '0102',
                label: '0102'
              },
              {
                value: '0103',
                label: '0103'
              },
              {
                value: '0104',
                label: '0104'
              }
              ]
            },
            {
              value: '02',
              label: '02单元',
              children: [{
                value: '0201',
                label: '0201'
              }, {
                value: '0202',
                label: '0202'
              }]
            }
          ]
        },
        {
          value: 'D1',
          label: 'D1座',
          children: [
            {
              value: '01',
              label: '01单元',
              children: [{
                value: '0101',
                label: '0101'
              },
              {
                value: '0102',
                label: '0102'
              },
              {
                value: '0103',
                label: '0103'
              },
              {
                value: '0104',
                label: '0104'
              }
              ]
            },
            {
              value: '02',
              label: '02单元',
              children: [{
                value: '0201',
                label: '0201'
              }, {
                value: '0202',
                label: '0202'
              }]
            }
          ]
        }

      ],
      temp: {
        uploadimg: ''
      },
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style scoped>
.pullRight{
    float:right;
    color:#409EFF;
    font-size:14px;
}
.pullRight i{
    padding:0 5px;
}

.icon-item {
  position: relative;
  margin: 20px 10px;
  height: 140px;
  text-align: center;
  width: 140px;
  float: left;
  font-size: 14px;
  color: #595959;
  cursor: pointer;
  border: 1px solid #e9e9e9;
  padding-top: 30px;
}
.icon-item:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.2);
}
.icon-item i{
  position: absolute;
  right: 10px;
  top:10px;
}
</style>
