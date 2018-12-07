<template>
  <div class="app-container">
    <div class="filter-container">
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
          :key="item.building"
          :label="item.building"
          :value="item" />
      </el-select>
      <!-- <el-select
        v-model="listQuery.danyuanName"
        placeholder="选择单元"
        clearable
        class="filter-item"
        @change="danyuanSelQuery"
      >
        <el-option v-for="item in danyuanList" :key="item" :label="item.unit" :value="item"/>
      </el-select> -->
      <el-select
        v-model="listQuery.keyStatusName"
        placeholder="权限状态"
        clearable
        class="filter-item"
        @change="keySel">
        <el-option
          v-for="item in keyStatusList"
          :key="item"
          :label="item"
          :value="item" />
      </el-select>
      <el-input
        v-model="search"
        placeholder="关键字"
        style="width: 200px;"
        class="filter-item" />
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
        label="用户名称"
        align="center"
        width="180"
        sortable
        prop="wxUserName ">
        <template slot-scope="scope">
          <span>{{ scope.row.wxUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户手机"
        align="center"
        width="180"
        sortable
        prop="wxUserTelephone ">
        <template slot-scope="scope">
          <span>{{ scope.row.wxUserTelephone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="角色"
        align="center"
        width="180"
        sortable
        prop="role ">
        <template slot-scope="scope">
          <span>员工</span>
        </template>
      </el-table-column>

      <el-table-column
        label="设备名称"
        align="center"
        width="180"
        sortable
        prop="deviceName  ">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="关联房产"
        align="center"
        width="180"
        sortable
        prop="filedName ">
        <template slot-scope="scope">
          <span>{{ scope.row.filedName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="过期时间"
        align="center"
        width="180"
        sortable
        prop="overdueTime ">
        <template slot-scope="scope">
          <span>{{ scope.row.overdueTime | dateFormat(('yyyy-MM-dd hh:mm:ss')) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="授权状态"
        align="center"
        width="180"
        sortable
        prop="shareStatus  ">
        <template slot-scope="scope">
          <span>{{ scope.row.shareStatus|keyShareFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="添加时间"
        align="center"
        width="180"
        sortable
        prop="addTime ">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime | dateFormat(('yyyy-MM-dd hh:mm:ss')) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="330">
        <template slot-scope="scope">
          <el-switch
            :active-value="1"
            v-model="scope.row.enableStatus"
            :active-text="(scope.row.enableStatus=='1')?'启用':'禁用'"
            @change="changeSwitch(scope.row)"/>
          <!-- <el-switch v-model="keyStatus"  v-if="item.redirect==='noredirect'||index==levelList.length-1" active-text="启用"   ></el-switch> -->
          <el-button
            type="text"
            size="small"
            @click="openLog(scope.row)">开锁日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.currentPage"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { getCommunity, getkeyPage, updatekeyPage } from '@/api/device'
import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    keyShareFilter(status) {
      // const statusMap = {
      //   estate: 'info',
      //   periphery: 'danger'
      // }
      const statusMap = {
        0: '不可分享钥匙',
        1: '可分享钥匙'
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
        S: getDate.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (getDate.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      return fmt
    }
  },
  components: { Tinymce, updatekeyPage },
  data() {
    return {
      keyStatus: true,
      options: [
        {
          value: 'B1',
          label: 'B1座',
          children: [
            {
              value: '01',
              label: '01单元',
              children: [
                {
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
              children: [
                {
                  value: '0201',
                  label: '0201'
                },
                {
                  value: '0202',
                  label: '0202'
                }
              ]
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
              children: [
                {
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
              children: [
                {
                  value: '0201',
                  label: '0201'
                },
                {
                  value: '0202',
                  label: '0202'
                }
              ]
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
              children: [
                {
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
              children: [
                {
                  value: '0201',
                  label: '0201'
                },
                {
                  value: '0202',
                  label: '0202'
                }
              ]
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
              children: [
                {
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
              children: [
                {
                  value: '0201',
                  label: '0201'
                },
                {
                  value: '0202',
                  label: '0202'
                }
              ]
            }
          ]
        }
      ],
      tableData: [],
      tableHeader: [],
      tableKey: 0,
      list: [
      ],
      search: '',
      total: 0,
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
        keyState: '',
        keyStatusName: '',
        // statusservice: undefined,
        keyword: '' // 搜索关键字
      },
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      statusbillOptions: ['payment', 'cancelaccount', 'invalid', 'nopay'],
      downloadLoading: false,
      // 数据
      buildingList: [],
      communityList: [],
      keyStatusList: ['可分享钥匙', '不可分享钥匙']
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    // 模糊搜索
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
    this.communityList.push(this.userInfo)
    this.listQuery.controllerName = this.userInfo.selectCommunity // 初始化绑定小区id,用来查询
    // //获取设备类型数据
    // getkeyPage(this.listQuery).then(response => {
    //   this.deviceTypeList = response.data.data;
    // });
    // 分页查询
    this.getList()
  },
  methods: {
    // 设备状态选择事件
    keySel(val) {
      if (val === '可分享钥匙') {
        this.listQuery.status = 1
      } else if (val === '不可分享钥匙') {
        this.listQuery.status = 0
      }
    },
    // 跳转到开门日志
    openLog(row) {
      const type = 'keyManage'
      this.$router.push({
        path:
          '/doorManage/deviceManage/openLog?deviceId=' +
          row.deviceId +
          '&userId=' +
          this.userInfo.selectCommunity +
          '&type=' + type +
          '&openId=' + row.wxUserId
      })
    },
    // 社区变化事件
    communitySelQuery(val) {
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
    buildingSelQuery(val) {
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
    danyuanSelQuery(val) {
      this.listQuery.danyuanName = val.unit
      this.listQuery.fieldId = val.id
    },
    changeSwitch(val) {
      const params = {
        id: val.id
      }
      if (val.enableStatus) {
        params.enablestatus = 1
      } else {
        params.enablestatus = 0
      }
      console.log(params)
      // 修改可用状态
      updatekeyPage(params).then(response => {
        console.log(123123)
        console.log(response.data)
        setTimeout(() => {
          this.getList()
        }, 3 * 1000)
        // this.$router.go(0)
      })
    },
    getList() {
      this.listLoading = true
      getkeyPage(this.listQuery).then(response => {
        console.log(313132)
        console.log(response.data.data.qryWxUserData)
        this.list = response.data.data.qryWxUserData
        console.log(this.list)
        this.total = response.data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      console.log(this.listQuery)
      // 搜索数据（默认请求第一页数据）
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      // 每页显示多少条数据
      this.listQuery.currentPage = val
      this.getList()
    },
    handleCurrentChange(val) {
      // 显示第几页的数据
      this.listQuery.page = val
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
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
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
    handleDownload() {
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
    formatJson(filterVal, jsonData) {
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
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      // this.$notify({
      //   title: '成功',
      //   message: '导入成功',
      //   type: 'success',
      //   duration: 2000
      // })
      this.tableData = results
      this.tableHeader = header
      console.log(this.tableData)
      console.log(header)
      // 将数据传给后台，后台存入数据库成功，则重新获取数据列表
      // this.list = results
      // this.total = results.length
      this.getList()
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
