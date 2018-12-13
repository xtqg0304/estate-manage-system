<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-select
        v-model="listQuery.communityName"
        placeholder="选择小区"
        clearable
        class="filter-item"
        @change="communitySelQuery">
        <el-option
          v-for="item in communityList"
          :key="item.selectCommunityName"
          :label="item.selectCommunityName"
          :value="item" />
      </el-select>
      <el-select
        v-model="listQuery.buildingName"
        placeholder="选择楼栋"
        clearable
        class="filter-item"
        @change="buildingSelQuery">
        <el-option
          v-for="item in buildingList"
          :key="item.id"
          :label="item.buildingName"
          :value="item" />
      </el-select>
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
        label="设备序列"
        align="center"
        width="120px"
        sortable
        prop="deviceSn">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceSn }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="设备名称"
        width="120px"
        sortable
        prop="deviceName">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="关联房产"
        width="180px"
        sortable
        prop="fieldName">
        <template slot-scope="scope">
          <span>{{ scope.row.fieldName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="排序"
        min-width="80px"
        align="center"
        sortable
        prop="sort">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="在线状态"
        width="120px"
        align="center"
        sortable
        prop="devStatus">
        <template slot-scope="scope">
          <span :class="scope.row.devStatus | statusClassFilter">{{ scope.row.devStatus| statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="进出标注"
        min-width="120px"
        align="center"
        sortable
        prop="outInFlag">
        <template slot-scope="scope">
          <span>{{ scope.row.outInFlag| outFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="设备流量"
        width="120px"
        align="center"
        sortable
        prop="capacity">
        <template slot-scope="scope">
          <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="scope.row.capacity | capacityFilter" />
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        width="80px"
        align="center"
        sortable
        prop="content">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        min-width="330"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleUpdate(scope.row)">修改</el-button>
          <el-button
            type="text"
            size="small"
            class="red"
            @click="handleDelete(scope.row)">删除</el-button>
          <el-button
            type="text"
            size="small"
            @click="openLog(scope.row)">开锁日志</el-button>
          <el-button
            type="text"
            size="small"
            @click="getKey(scope.row)">获取钥匙</el-button>
          <el-button
            type="text"
            size="small"
            @click="getCode(scope.row)">二维码</el-button>
          <el-button
            type="text"
            size="small"
            @click="getList()">刷新在线状态</el-button>

        </template>
      </el-table-column>
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
        label-width="90px"
        style="width: 430px; margin-left:50px;">
        <el-form-item
          label="设备名称"
          prop="deviceName">
          <el-input v-model="temp.deviceName" />
        </el-form-item>

        <el-form-item
          label="设备序列"
          prop="deviceSn">
          <el-input v-model="temp.deviceSn" />
        </el-form-item>

        <el-form-item
          label="排序"
          prop="sort">
          <el-input v-model="temp.sort" />
        </el-form-item>
        <el-form-item
          label="设备类型"
          prop="deviceType">
          <el-select
            v-model="temp.deviceTypeName"
            class="filter-item"
            placeholder="请选择"
            style="width:100%"
            @change="deviceTypeSel">
            <el-option
              v-for="item in deviceTypeList"
              :key="item.deviceFactoryName"
              :label="item.deviceFactoryName"
              :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="temp.deviceTypeName === '声波门禁'"
          label="设备IP"
          prop="deviceIp">
          <el-input v-model="temp.deviceIp" />
        </el-form-item>
        <el-form-item
          v-if="temp.deviceTypeName === '声波门禁'"
          label="服务器IP"
          prop="serviceIp">
          <el-input v-model="temp.serviceIp" />
        </el-form-item>
        <el-form-item
          label="关联房产"
          prop="relateHouse">
          <el-select
            v-model="temp.communityName"
            class="filter-item"
            placeholder="选择小区"
            style="width:31%"
            @change="communitySel">
            <el-option
              v-for="item in communityList"
              :key="item.selectCommunityName"
              :label="item.selectCommunityName"
              :value="item" />
          </el-select>
          <el-select
            v-model="temp.buildingName"
            class="filter-item"
            placeholder="选择楼栋"
            style="width:31%"
            @change="buildingSel">
            <el-option
              v-for="item in buildingList"
              :key="item.id"
              :label="item.buildingName"
              :value="item" />
          </el-select>
          <el-select
            v-model="temp.danyuanName"
            class="filter-item"
            placeholder="选择单元"
            style="width:31%"
            @change="danyuanSel">
            <el-option
              v-for="item in danyuanList"
              :key="item"
              :label="item.unit"
              :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="门号"
          prop="doorNo">
          <el-select
            v-model="temp.doorNo"
            class="filter-item"
            placeholder="请选择"
            style="width:100%">
            <el-option
              v-for="item in doorNoList"
              :key="item"
              :label="item"
              :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remarks">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="temp.remarks"
            type="textarea"
            placeholder="请输入内容" />
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus==='create'"
          type="primary"
          @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button
          v-else
          type="primary"
          @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 图片 -->
    <el-dialog
      :title="codeTitle"
      :visible.sync="dialogForKey"
      width="40%">
      <div
        align="center"
        style="width:100%;height:430px">
        <img
          :src="qrcode"
          style="width:80%;height:100%">
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
  getDevieType,
  getCommunity,
  getBuilding,
  crateDeive,
  getDeviceList,
  deleteDvice,
  updateDvice,
  getCode
} from '@/api/device'
import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves' // 水波纹指令
import Upload from '@/components/Upload/singleImage3'
import { mapGetters } from 'vuex'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    capacityFilter(status) {
      if (status) {
        console.log(temp)
        const temp = parseFloat(status).toFixed(2)
        return parseInt(temp / 51200 * 100)
      } else {
        return 0
      }
    },
    outFilter(status) {
      const statusMap = {
        1: '进',
        2: '出'
      }
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        0: '离线',
        1: '在线'
      }
      return statusMap[status]
    },
    statusClassFilter(status) {
      const statusMap = {
        0: 'red',
        1: 'green'
      }
      return statusMap[status]
    }
  },
  components: { Tinymce, Upload },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      tableKey: 0,
      search: '',
      deviceList: [
        {
        }
      ], // 设备表格数据
      total: 0, // 总数
      listLoading: false,
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
        field: '',
        deviceStatus: '',
        deviceStatusName: '',
        // statusservice: undefined,
        keyword: '' // 搜索关键字
      },
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusserviceOptions: ['estate', 'periphery'],
      showReviewer: false,
      // 绑定钥匙二维码
      qrcode: '',
      codeTitle: '',
      // 设备数据
      deviceTypeList: [],
      communityList: [], // 小区
      buildingList: [],
      danyuanList: [],
      doorNoList: [1, 2],
      temp: {
        // 添加设备参数
        deviceName: '',
        deviceSn: '',
        deviceIp: '',
        serviceIp: '',
        sort: '',
        deviceTypeName: '',
        deviceTypeId: '',
        communityName: '',
        communityId: '',
        buildingName: '',
        buildingId: '',
        danyuanId: '',
        danyuanName: '',
        remarks: '',
        doorNo: ''
      },
      dialogForKey: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        deviceName: [
          { required: true, message: '必填', trigger: 'change' },
          { max: 60, message: '长度最大60 个字符' }
        ],
        deviceSn: [
          { required: true, message: '必填', trigger: 'change' },
          { max: 60, message: '长度最大60 个字符' }
        ],
        sort: [
          { required: true, message: '必填', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== '') {
                if (
                  /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false
                ) {
                  callback(new Error('请填写大于0的数字'))
                } else if (value > 100) {
                  callback(new Error('请输入小于100的数字'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        deviceType: [
          {
            validator: (rule, value, callback) => {
              const deviceTypeName = this.temp.deviceTypeName
              if (deviceTypeName === '') {
                callback(new Error('请选择'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        deviceIp: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 60, message: '长度最大60 个字符' }
        ],
        serviceIp: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 60, message: '长度最大60 个字符' }
        ],
        relateHouse: [
          {
            validator: (rule, value, callback) => {
              const communityName = this.temp.communityName
              const buildingName = this.temp.buildingName
              const danyuanName = this.temp.danyuanName
              if (communityName === '') {
                callback(new Error('请选择'))
              } else if (buildingName === '') {
                callback(new Error('请选择'))
              } else if (danyuanName === '') {
                callback(new Error('请选择'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        doorNo: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    tables() {
      const search = this.search
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.deviceList.filter(data => {
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
      return this.deviceList
    }
  },
  created() {
    // this.userInfo.selectCommunity = "05de5f8008394f1da4857078b754cb49";
    // this.userInfo.selectCommunityName = "小区测试";
    // 小区名称
    this.communityList.push(this.userInfo)
    this.listQuery.controllerName = this.userInfo.selectCommunity // 初始化绑定小区id,用来查询
    // 获取设备类型数据
    getDevieType({}).then(response => {
      this.deviceTypeList = response.data.data
    })
    // 分页查询
    this.getList()
  },
  methods: {
    // 跳转到开门日志
    openLog(row) {
      this.$router.push({
        path:
          '/doorManage/deviceManage/openLog?deviceId=' +
          row.deviceId +
          '&userId=' +
          this.userInfo.selectCommunity
      })
    },
    getKey(row) {
      this.qrcode = ''
      this.codeTitle = '获取钥匙 请扫二维码获取门禁权限'
      this.dialogForKey = true
      const params = {
        id: row.deviceId,
        userId: this.userInfo.selectCommunity
      }
      getCode(params).then(response => {
        this.qrcode = response.data.data
      })
    },
    // 获取绑定的二维码
    getCode(row) {
      this.qrcode = ''
      this.codeTitle = '二维码 请扫二维码开门'
      this.dialogForKey = true
      const params = {
        id: row.deviceId,
        userId: this.userInfo.selectCommunity
      }
      getCode(params).then(response => {
        this.qrcode = response.data.data
      })
    },
    deviceStatus(val) {

    },
    // 查询条件变化
    // 社区变化事件
    communitySelQuery(val) {
      this.listQuery.communityName = val.selectCommunityName
      this.listQuery.communityId = val.selectCommunity
      // 获取小区下的楼栋
      // const params = {
      //   communityId: this.userInfo.selectCommunity,
      //   buildingId: ''
      // }
      const params = {
        id: this.userInfo.selectCommunity
      }
      getBuilding(params).then(response => {
        if (response.data.code === 200) {
          this.buildingList = response.data.data
        }

        // this.buildingList = response.data.data
        // for (const i in this.buildingList) {
        //   if (this.listQuery.buildingName === this.buildingList[i].building) {
        //     this.buildingSel(this.buildingList[i])
        //   }
        // }
      })
      // getCommunity(params).then(response => {
      //   this.buildingList = response.data.data
      //   for (const i in this.buildingList) {
      //     if (this.listQuery.buildingName === this.buildingList[i].building) {
      //       this.buildingSel(this.buildingList[i])
      //     }
      //   }
      // })
    },
    // 楼栋变化获取单元
    buildingSelQuery(val) {
      this.listQuery.buildingName = ''
      this.listQuery.buildingId = ''
      this.listQuery.field = ''
      if (typeof val.buildingName !== 'undefined') {
        this.listQuery.buildingName = val.buildingName
        this.listQuery.buildingId = val.id
        this.listQuery.field = val.id
        const params = {
          communityId: this.userInfo.selectCommunity,
          buildingId: val.id
        }
        getCommunity(params).then(response => {
          if (response.data.code === 200) {
            this.danyuanList = response.data.data
          }
        })
      }
    },
    // 单元变化
    danyuanSelQuery(val) {
      this.listQuery.danyuanName = val.unit
      this.listQuery.field = val.id
    },
    // 社区变化事件
    communitySel(val) {
      this.temp.communityName = val.selectCommunityName
      this.temp.communityId = val.selectCommunity
      // 获取小区下的楼栋
      const params = {
        id: this.userInfo.selectCommunity
      }
      getBuilding(params).then(response => {
        if (response.data.code === 200) {
          this.buildingList = response.data.data
          if (this.dialogStatus === 'update') {
          // 修改编辑时调用
            for (const i in this.buildingList) {
              if (this.temp.buildingName === this.buildingList[i].buildingName) {
                this.buildingSel(this.buildingList[i])
              }
            }
          }
        }
      })
    },
    // 楼栋变化获取单元
    buildingSel(val) {
      this.temp.buildingName = val.buildingName
      this.temp.buildingId = val.id
      const params = {
        communityId: this.userInfo.selectCommunity,
        buildingId: val.id
      }
      getCommunity(params).then(response => {
        if (response.data.code === 200) {
          this.danyuanList = response.data.data
        }
      })
    },
    // 单元变化
    danyuanSel(val) {
      this.temp.danyuanName = val.unit
      this.temp.danyuanId = val.id
    },
    // 获取设备类型
    deviceTypeSel(val) {
      this.temp.deviceTypeName = val.deviceFactoryName
      this.temp.deviceTypeId = val.id
      if (this.temp.deviceTypeName === '微门禁') {
        this.temp.deviceIp = ''
        this.temp.serviceIp = ''
      }
    },
    getList() {
      this.listLoading = true
      getDeviceList(this.listQuery).then(response => {
        this.listLoading = false
        this.deviceList = response.data.data.qryInfoData
        this.total = response.data.data.totalCount
        console.log(this.deviceList)
        console.log(132)
      })
    },
    handleFilter() {
      console.log(this.listQuery)
      // 搜索数据（默认请求第一页数据）
      this.listQuery.currentPage = 1
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
        deviceTypeName: '',
        communityName: '',
        buildingName: '',
        danyuanName: '',
        deviceName: '',
        deviceSn: '',
        deviceId: '',
        serviceIp: '',
        sort: '',
        deviceType: '',
        danyuan: '', // 房产Id
        remarks: '',
        doorNo: ''
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
      const fieldName =
        '' +
        this.temp.communityName +
        '-' +
        this.temp.buildingName +
        '-' +
        this.temp.danyuanName
      // 新建 提交确认

      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const params = {
            deviceId: '',
            deviceName: this.temp.deviceName,
            deviceSn: this.temp.deviceSn,
            sort: this.temp.sort,
            deviceType: this.temp.deviceTypeId,
            deviceIp: this.temp.deviceIp,
            deviceChannelNo: this.temp.doorNo,
            fieldId: this.temp.danyuanId,
            fieldName: fieldName,
            content: this.temp.remarks,
            parentDeviceId: this.temp.serviceIp
          }

          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          // 添加设备
          crateDeive(params).then(response => {
            console.log(1232323)
            console.log(params)
            console.log(response)
            if (response.data.code === 200) {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
              this.getList()
            }
          })
        }
      })
    },
    handleUpdate(row) {
      console.log(1111)
      console.log(row)
      this.temp.id = row.deviceId
      this.temp.deviceName = row.deviceName
      this.temp.deviceSn = row.deviceSn
      this.temp.sort = row.sort
      this.temp.doorNo = row.deviceChannelNo
      this.temp.deviceIp = row.deviceIp
      this.temp.serviceIp = row.parentDeviceId
      this.temp.remarks = row.content
      this.temp.danyuanId = row.fieldId
      if (row.fieldName) {
        const filename = row.fieldName.split('-')
        this.temp.communityName = filename[0]
        this.temp.buildingName = filename[1]
        this.temp.danyuanName = filename[2]
      }

      // this.temp.communityName = "测试小区";
      // this.temp.buildingName = "二栋";
      for (const i in this.communityList) {
        if (
          this.temp.communityName === this.communityList[i].selectCommunityName
        ) {
          this.communitySel(this.communityList[i])
        }
      }
      for (const i in this.deviceTypeList) {
        if (row.deviceType === this.deviceTypeList[i].id) {
          this.temp.deviceTypeName = this.deviceTypeList[i].deviceFactoryName
          this.temp.deviceTypeId = this.deviceTypeList[i].id
        }
      }
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
          let fieldName = ''
          if (this.temp.communityName) {
            fieldName = fieldName + this.temp.communityName
          }
          if (this.temp.buildingName) {
            fieldName = fieldName + '-' + this.temp.buildingName
          }
          if (this.temp.danyuanName) {
            fieldName = fieldName + '-' + this.temp.danyuanName
          }

          const params = {
            deviceId: this.temp.id,
            deviceName: this.temp.deviceName,
            deviceSn: this.temp.deviceSn,
            sort: this.temp.sort,
            parentDeviceId: this.temp.serviceIp,
            deviceIp: this.temp.deviceIp,
            deviceType: this.temp.deviceTypeId,
            deviceChannelNo: this.temp.doorNo,
            fieldId: this.temp.danyuanId,
            content: this.temp.remarks,
            fieldName: fieldName
          }

          // 修改设备
          updateDvice(params).then(response => {
            console.log(params)
            console.log(response)
            if (response.data.code === 200) {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      // const deviceId = row.deviceId
      const params = {
        id: row.deviceId
      }
      // 添加设备
      deleteDvice(params).then(response => {
        // 在列表中删除 （将当前id传给后台）
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    }
  }
}
</script>
<style>
.demo-block-control {
  border-top: 1px solid #eaeefb;
}
.red {
  color: red;
}
.green {
  color: green;
}
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
