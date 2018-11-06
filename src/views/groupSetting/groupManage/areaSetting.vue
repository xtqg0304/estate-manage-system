<template>
  <div class="app-container">
    <el-row class="tac" :gutter="20">
      <el-col :span="4">
        <h5>默认颜色</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="filter-container">
          <el-button class="filter-item"
                    style="margin-left: 10px;"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleCreate">{{ $t('table.add') }}</el-button>
          <el-input v-model="listQuery.keyword"
                    placeholder="关键字"
                    style="width: 200px;"
                    class="filter-item"
                    @keyup.enter.native="handleFilter" />
          <el-button v-waves
                    class="filter-item"
                    type="primary"
                    icon="el-icon-search"
                    @click="handleFilter">{{ $t('table.search') }}</el-button>
        </div>
        <el-table v-loading="listLoading"
                  :key="tableKey"
                  :data="list"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%;min-height:500px;">
          <el-table-column :label="$t('table.id')"
                          align="center"
                          width="65">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.date')"
                          width="150px"
                          align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.servicename')"
                          width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.servicename }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.servicephone')"
                          width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.servicephone }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.remarks')"
                          min-width="150px"
                          align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.uploadimg')"
                          align="center"
                          width="120">
            <template slot-scope="scope">
              <span class="link-type">
                <el-popover placement="left"
                            trigger="hover">
                  <!-- <img  :src="scope.row.uploadimg" style="max-height:200px;"  >
                  <img  :src="scope.row.uploadimg" slot="reference" style="max-height:23px;vertical-align: bottom;"  > -->
                  <img src="https://cdn.duitang.com/uploads/item/201508/30/20150830105732_nZCLV.jpeg"
                      style="max-height:200px;">
                  <img slot="reference"
                      src="https://cdn.duitang.com/uploads/item/201508/30/20150830105732_nZCLV.jpeg"
                      style="max-height:23px;vertical-align: bottom;">
                </el-popover>
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.statusservice')"
                          class-name="status-col"
                          width="150">
            <template slot-scope="scope">
              <el-tag :type="scope.row.statusservice | statusFilter">{{ $t('table.'+scope.row.statusservice) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.actions')"
                          align="center"
                          width="230"
                          class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="primary"
                        size="mini"
                        @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
              <el-button type="danger"
                        size="mini"
                        @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination :current-page="listQuery.page"
                        :page-sizes="[10,20,30, 50]"
                        :page-size="listQuery.limit"
                        :total="total"
                        background
                        layout="total, sizes, prev, pager, next, jumper"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" />
        </div>

        <el-dialog :title="textMap[dialogStatus]"
                  :visible.sync="dialogFormVisible">
          <el-form ref="dataForm"
                  :rules="rules"
                  :model="temp"
                  label-position="left"
                  label-width="70px"
                  style="width: 400px; margin-left:50px;">
            <el-form-item
              label="上级区域"
              prop="statusservice">
              <el-cascader
                expand-trigger="hover"
                :options="options"
                v-model="selectedOptions2"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="区域名称"
                          prop="servicename">
              <el-input v-model="temp.servicename" />
            </el-form-item>
            <el-form-item label="区域描述">
              <el-input type="textarea" v-model="temp.desc"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
              class="dialog-footer">
            <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
            <el-button v-if="dialogStatus=='create'"
                      type="primary"
                      @click="createData">{{ $t('table.confirm') }}</el-button>
            <el-button v-else
                      type="primary"
                      @click="updateData">{{ $t('table.confirm') }}</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogPvVisible"
                  title="Reading statistics">
          <el-table :data="pvData"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%">
            <el-table-column prop="key"
                            label="Channel" />
            <el-table-column prop="pv"
                            label="Pv" />
          </el-table>
          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                      @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
          </span>
        </el-dialog>

      </el-col>
    </el-row>


  </div>
</template>

<script>
import {
  fetchList,
  fetchTable,
  createNotice,
  updateNotice
} from '@/api/phone'
import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import Upload from '@/components/Upload/singleImage3'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        estate: 'info',
        periphery: 'danger'
      }
      return statusMap[status]
    }
  },
  components: { Tinymce, Upload },
  data () {
    return {
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      selectedOptions2: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        statusservice: undefined,
        keyword: undefined
      },
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusserviceOptions: ['estate', 'periphery'],
      showReviewer: false,
      temp: {
        id: undefined,
        timestamp: new Date(),
        servicename: '',
        statusservice: 'estate',
        remarks: '',
        servicephone: '',
        uploadimg: ''

      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter () {
      console.log(this.listQuery)
      // 搜索数据（默认请求第一页数据）
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange (val) {
      // 每页显示多少条数据
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      // 显示第几页的数据
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus (row, status) {
      // 改变当前按钮的状态
      // console.log(row)
      // console.log(status)
      // 请求后台接口将状态传给后台，如果成功，前端修改数据
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp () {
      // 重新初始化新建对象的默认值
      this.temp = {
        id: undefined,
        remarks: '',
        timestamp: new Date(),
        servicename: '',
        statusservice: 'estate',
        servicephone: '',
        uploadimg: ''
      }
    },
    handleCreate () {
      // 新建一条信息
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate() // 清除表单的校验
      })
    },
    createData () {
      console.log(this.temp)
      // 新建 提交确认
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createNotice(this.temp).then(() => {
            // 新建成功后的回调
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate (row) {
      // 修改/编辑事件
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData () {
      // 修改/编辑 确认事件
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateNotice(tempData).then(() => {
            for (const v of this.list) {
              // 更新后的值插入原来数据的位置
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete (row) {
      // 在列表中删除 （将当前id传给后台）
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv (pv) {
      // 获取阅读数据表格
      fetchTable(pv).then(response => {
        console.log(response.data.pvData)
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload () {
      // 导出数据
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = [
          'timestamp',
          'title',
          'type',
          'importance',
          'status'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleChange(value) {
      console.log(value);
    }
  }
}
</script>
<style>
.filter-container .filter-item-rangedate {
  display: inline-flex;
  vertical-align: middle;
  margin-bottom: 10px;
}
.el-date-editor .el-range-separator {
  padding: 0;
}
.filter-container,
.pagination-container {
  text-align: right;
}
.editor-custom-btn-container {
  top: 0 !important;
}
</style>
