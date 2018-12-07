<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="el-icon-edit"
                 @click="handleCreate">{{ $t('table.add') }}</el-button> -->
      <!-- <el-select v-model="listQuery.deviceStatusName"
                 placeholder="在线状态"
                 clearable
                 class="filter-item"
                 @change="deviceSel">
        <el-option v-for="item in deviceStatusList"
                   :key="item"
                   :label="item"
                   :value="item" />
      </el-select> -->
      <el-select
        v-model="listQuery.communityName"
        placeholder="选择小区"
        clearable
        class="filter-item"
        @change="communitySel">
        <el-option
          v-for="item in communityList"
          :key="item"
          :label="item.selectCommunityName"
          :value="item" />
      </el-select>
      <el-select
        v-model="listQuery.buildingName"
        placeholder="选择楼栋"
        clearable
        class="filter-item"
        @change="buildingSel">
        <el-option
          v-for="item in buildingList"
          :key="item"
          :label="item.building"
          :value="item" />
      </el-select>
      <!-- <el-select v-model="listQuery.danyuanName"
                 placeholder="选择单元"
                 clearable
                 class="filter-item"
                 @change="danyuanSel">
        <el-option v-for="item in danyuanList"
                   :key="item"
                   :label="item.unit"
                   :value="item" />
      </el-select> -->
      <el-date-picker
        v-model="listQuery.time"
        :picker-options="pickerOptions"
        class="filter-item-rangedate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="yyyy-MM-dd"
        @change="getTime" />
      <el-input
        v-model="search"
        placeholder="关键字"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="tables"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:500px;">
      <el-table-column
        label="头像"
        align="center"
        width="150">
        <template slot-scope="scope">
          <!-- <span> -->
          <!-- <el-popover placement="left"
                        trigger="hover"> -->
          <!-- <img src="https://cdn.duitang.com/uploads/item/201508/30/20150830105732_nZCLV.jpeg"
                   style="max-height:200px;"> -->
          <!-- slot="reference" -->
          <img
            :src=" scope.row.picUrl "
            style="max-height:80px;vertical-align: bottom;">
            <!-- </el-popover> -->
            <!-- </span> -->
            <!-- <span>{{ scope.row.userPciture }}</span> -->
        </template>
      </el-table-column>
      <el-table-column
        label="用户名称"
        align="center"
        width="180"
        sortable
        prop="inoutuserName">
        <template slot-scope="scope">
          <span>{{ scope.row.inoutuserName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="设备序列"
        align="center"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceSn }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="设备名称"
        align="center"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="关联房产"
        align="center"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.fieldName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="开门状态"
        align="center"
        width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.inoutSuccess| statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="开门时间"
        align="center"
        width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.inoutTime | dateFormat(('yyyy-MM-dd hh:mm:ss')) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="$t('table.date')"
                       width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column :label="$t('table.servicename')"
                       width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.servicename }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column :label="$t('table.servicephone')"
                       width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.servicephone }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column :label="$t('table.remarks')"
                       min-width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remarks }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column :label="$t('table.uploadimg')"
                       align="center"
                       width="120">
        <template slot-scope="scope">
          <span class="link-type">
            <el-popover placement="left"
                        trigger="hover">
              <img  :src="scope.row.uploadimg" style="max-height:200px;"  >
              <img  :src="scope.row.uploadimg" slot="reference" style="max-height:23px;vertical-align: bottom;"  >
              <img src="https://cdn.duitang.com/uploads/item/201508/30/20150830105732_nZCLV.jpeg"
                   style="max-height:200px;">
              <img slot="reference"
                   src="https://cdn.duitang.com/uploads/item/201508/30/20150830105732_nZCLV.jpeg"
                   style="max-height:23px;vertical-align: bottom;">
            </el-popover>
          </span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column :label="$t('table.statusservice')"
                       class-name="status-col"
                       width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.statusservice | statusFilter">{{ $t('table.'+scope.row.statusservice) }}</el-tag>
        </template>
      </el-table-column> -->
      <!-- <el-table-column :label="$t('table.actions')"
                       align="center"
                       width="218"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="danger"
                     size="mini"
                     @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.pageSize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;">
        <el-form-item
          :label="$t('table.date')"
          prop="timestamp">
          <el-date-picker
            v-model="temp.timestamp"
            type="datetime"
            placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item
          :label="$t('table.statusservice')"
          prop="statusservice">
          <el-select
            v-model="temp.statusservice"
            class="filter-item"
            placeholder="请选择">
            <el-option
              v-for="item in statusserviceOptions"
              :key="item"
              :label="$t('table.'+item)"
              :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('table.servicename')"
          prop="servicename">
          <el-input v-model="temp.servicename" />
        </el-form-item>
        <el-form-item
          :label="$t('table.servicephone')"
          prop="servicephone">
          <el-input v-model="temp.servicephone" />
        </el-form-item>
        <el-form-item
          :label="$t('table.remarks')"
          prop="remarks"
          style="width:650px;">
          <tinymce v-model="temp.remarks" />
        </el-form-item>
        <el-form-item :label="$t('table.uploadimg')">
          <Upload v-model="temp.uploadimg" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button
          v-else
          type="primary"
          @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogPvVisible"
      title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="key"
          label="Channel" />
        <el-table-column
          prop="pv"
          label="Pv" />
      </el-table>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  getCommunity,
  getOpenLog
} from '@/api/device'

import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves' // 水波纹指令
// import { parseTime } from '@/utils'
import Upload from '@/components/Upload/singleImage3'
import { mapGetters } from 'vuex'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      // const statusMap = {
      //   estate: 'info',
      //   periphery: 'danger'
      // }
      const statusMap = {
        0: '否',
        1: '是'
      }
      return statusMap[status]
    },
    // 时间格式化
    dateFormat(value, fmt) {
      const getDate = new Date(value)
      const o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+': getDate.getSeconds(),
        'q+': Math.floor((getDate.getMonth() + 3) / 3),
        'S': getDate.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }

  },
  components: { Tinymce, Upload },
  data() {
    return {
      // 在线状态
      deviceStatusList: ['离线', '在线'],
      // 小区数组
      communityList: [],
      // 楼栋数组
      buildingList: [],
      // 单元数组
      danyuanList: [],
      search: '',
      // 搜索条件
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        controllerName: '', // 小区id
        communityId: '', // 小区id用来做标识
        communityName: '',
        buildingName: '',
        buildingId: '',
        danyuanName: '',
        fieldId: '',
        // field:"",
        inoutDeviceId: '', // 设备记录ID
        inoutuserId: '', // 人员ID
        // deviceStatus: "",
        // deviceStatusName: "",
        // statusservice: undefined,
        keyword: ''// 搜索关键字
      },
      // 设备数据
      deviceTypeList: [],
      // communityList: [], // 小区
      // buildingList: [],
      // danyuanList: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusserviceOptions: ['estate', 'periphery'],
      showReviewer: false,
      temp: {
        // inoutDeviceId: '',
        // inoutuserId: '',
        // id: undefined,
        // timestamp: new Date(),
        // servicename: '',
        // statusservice: 'estate',
        // remarks: '',
        // servicephone: '',
        // uploadimg: ''

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
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    tables() {
      const search = this.search
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.list.filter(data => {
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          // 注意： some() 不会对空数组进行检测。
          // 注意： some() 不会改变原始数组。
          return Object.keys(data).some(key => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
        })
      }
      return this.list
    }

  },
  created() {
    this.listQuery.controllerName = this.userInfo.selectCommunity// 初始化绑定小区id,用来查询
    this.listQuery.deviceId = this.$route.query.deviceId// 设备记录id
    this.listQuery.inoutuserId = this.$route.query.userId// 绑定人员id
    // 小区数组
    this.communityList.push(this.userInfo)
    // 初始化表格数据
    this.getList()
  },
  methods: {

    getTime() {
      this.listQuery.beginTime = ''
      this.listQuery.endTime = ''
      if (this.listQuery.time.length > 0) {
        this.listQuery.beginTime = this.listQuery.time[0] + ' 00:00:00'
        this.listQuery.endTime = this.listQuery.time[1] + ' 23:59:59'
      }
    },
    // 获取开门日志
    getList() {
      this.listLoading = true
      getOpenLog(this.listQuery).then(response => {
        this.list = response.data.data.qryDeviceData
        console.log(6668)
        console.log(this.listQuery)
        console.log(this.list)
        this.total = response.data.data.totalCount
        this.listLoading = false
      })
    },
    // 设备状态选择事件
    // deviceSel(val) {
    //   if (val === '离线') {
    //     this.listQuery.deviceStatus = 0;
    //   } else
    //     if (val === '在线') {
    //       this.listQuery.deviceStatus = 1;
    //     }
    // },
    // 社区变化事件
    communitySel(val) {
      this.listQuery.communityName = val.selectCommunityName
      this.listQuery.communityId = val.selectCommunity
      // 获取小区下的楼栋
      const params = {
        communityId: this.userInfo.selectCommunity,
        buildingId: ''
      }
      getCommunity(params).then(response => {
        this.buildingList = response.data.data
        for (var i in this.buildingList) {
          if (this.listQuery.buildingName === this.buildingList[i].building) {
            this.buildingSel(this.buildingList[i])
          }
        }
      })
    },
    // 楼栋变化获取单元
    buildingSel(val) {
      this.listQuery.buildingName = ''
      this.listQuery.buildingId = ''
      this.listQuery.field = ''
      if (typeof val.building !== 'undefined') {
        this.listQuery.buildingName = val.building
        this.listQuery.buildingId = val.buildingId
        this.listQuery.field = val.buildingId
        const params = {
          communityId: this.userInfo.selectCommunity,
          buildingId: val.buildingId
        }
        getCommunity(params).then(response => {
          this.danyuanList = response.data.data
        })
      }
    },
    // 单元变化
    danyuanSel(val) {
      this.listQuery.danyuanName = val.unit
      // this.listQuery.field = val.id;
      this.listQuery.fieldId = val.id
    },
    handleFilter() {
      // 搜索数据（默认请求第一页数据）
      this.listQuery.currentPage = 1
      console.log(this.listQuery)
      this.getList()
    },
    handleSizeChange(val) {
      // 每页显示多少条数据
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      // 显示第几页的数据
      this.listQuery.currentPage = val
      this.getList()
    },
    handleModifyStatus(row, status) {
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
    resetTemp() {
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
    handleCreate() {
      // 新建一条信息
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate() // 清除表单的校验
      })
    },
    createData() {
      console.log(this.temp)
      // 新建 提交确认
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          // createNotice(this.temp).then(() => {
          //   // 新建成功后的回调
          //   this.list.unshift(this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '创建成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    handleUpdate(row) {
      // 修改/编辑事件
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // 修改/编辑 确认事件
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateNotice(tempData).then(() => {
          //   for (const v of this.list) {
          //     // 更新后的值插入原来数据的位置
          //     if (v.id === this.temp.id) {
          //       const index = this.list.indexOf(v)
          //       this.list.splice(index, 1, this.temp)
          //       break
          //     }
          //   }
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '更新成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    handleDelete(row) {
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
    handleFetchPv(pv) {
      // 获取阅读数据表格
      // fetchTable(pv).then(response => {
      //   console.log(response.data.pvData)
      //   this.pvData = response.data.pvData
      //   this.dialogPvVisible = true
      // })
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
