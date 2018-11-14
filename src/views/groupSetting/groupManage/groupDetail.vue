<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span> 基本信息</span>
        <span class="pullRight">
          <i v-if="!editdialog" class="el-icon-edit" @click="handelEdit">修改</i>
          <i v-if="editdialog" class="el-icon-document" @click="handelSave">保存</i>
          <i v-if="editdialog" class="el-icon-close" @click="editdialog=false">取消</i>
        </span>
      </div>
      <div class="component-item">
        <el-form v-if="editdialog" label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="集团编码">
                {{ tempGroupInfo.code }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="所属城市">
                <el-select v-model="tempGroupInfo.province" filterable placeholder="请选择省" @change="getCityOfProvince">
                  <el-option
                    v-for="item in provinceOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
                <el-select v-model="tempGroupInfo.city" placeholder="请选择市" @change="getCountyOfCity">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
                <el-select v-model="tempGroupInfo.county" placeholder="请选择区/县">
                  <el-option
                    v-for="item in countyOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="集团简称">
                <el-input v-model="tempGroupInfo.shortName"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总部地址">
                <el-input v-model="tempGroupInfo.site"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮编">
                <el-input v-model="tempGroupInfo.zipCode"/>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="集团全名">
                <el-input v-model="tempGroupInfo.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="tempGroupInfo.contact"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="tempGroupInfo.telephone"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form v-if="!editdialog" label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="集团编码">
                {{ groupInfo.code }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="所属城市">
                {{ groupInfo.province }}/ {{ groupInfo.city }}/{{ groupInfo.country }}
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="集团简称">
                {{ groupInfo.shortName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总部地址">
                {{ groupInfo.site }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮编">
                {{ groupInfo.zipCode }}
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="集团全名">
                {{ groupInfo.name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人">
                {{ groupInfo.contact }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话">
                {{ groupInfo.telephone }}
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
          <i v-if="!editLogoImg" class="el-icon-edit" @click="handelEditLogo">修改</i>
          <i v-if="editLogoImg" class="el-icon-document" @click="handelSaveLogo">保存</i>
          <i v-if="editLogoImg" class="el-icon-close" @click="editLogoImg=false">取消</i>
        </span>
      </div>
      <div class="component-item">
        <el-form v-if="!editLogoImg" label-width="80px">
          <el-form-item label="集团logo">
            <img :src="groupInfo.logo">
          </el-form-item>
          <el-form-item label="集团图标">
            <img :src="groupInfo.icon">
          </el-form-item>
        </el-form>
        <el-form v-if="editLogoImg" label-width="80px">
          <el-form-item label="集团logo">
            <Upload v-model="tempGroupInfo.logo" />
          </el-form-item>
          <el-form-item label="集团图标">
            <Upload v-model="tempGroupInfo.icon" />
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
          <i class="el-icon-close"/>
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
          <i class="el-icon-close"/>
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
          <i class="el-icon-close"/>
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
  fetchGroupInfo,
  updateGroupInfo,
  fetchProvince,
  fetchCounty,
  fetchCity
} from '@/api/groupManage'
import waves from '@/directive/waves' // 水波纹指令
import Upload from '@/components/Upload/singleImage3'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: { Upload },
  data() {
    return {
      groupInfo: {},
      tempGroupInfo: {},
      editdialog: false,
      editLogoImg: false,
      provinceOptions: [],
      cityOptions: [],
      countyOptions: []

    }
  },
  created() {
    this.getGroup()
    this.getProvinceList()
  },
  methods: {
    getGroup() {
      this.listLoading = true
      fetchGroupInfo().then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.groupInfo = Object.assign({}, response.data.data)
            this.tempGroupInfo = Object.assign({}, response.data.data)
            this.listLoading = false
          } else {
            this.$notify.error({
              title: '失败',
              message: response.data.msg,
              duration: 2000
            })
          }
        } else {
          this.$notify.error({
            title: '失败',
            message: response.data.msg,
            duration: 2000
          })
        }
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    handelEdit() {
      this.editdialog = true
    },
    handelEditLogo() {
      this.editLogoImg = true
    },
    handelSaveLogo() {
      this.listLoading = true
      updateGroupInfo(this.tempGroupInfo).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            Object.assign(this.groupInfo, this.tempGroupInfo)
            this.listLoading = false
            this.editLogoImg = false
          } else {
            this.$notify.error({
              title: '失败',
              message: response.data.msg,
              duration: 2000
            })
          }
        } else {
          this.$notify.error({
            title: '失败',
            message: response.data.msg,
            duration: 2000
          })
        }
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    handelSave() {
      this.listLoading = true
      updateGroupInfo(this.tempGroupInfo).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            Object.assign(this.groupInfo, this.tempGroupInfo)
            this.listLoading = false
            this.editdialog = false
          } else {
            this.$notify.error({
              title: '失败',
              message: response.data.msg,
              duration: 2000
            })
          }
        } else {
          this.$notify.error({
            title: '失败',
            message: response.data.msg,
            duration: 2000
          })
        }
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    getProvinceList() {
      this.listLoading = true
      fetchProvince({ name: '' }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            console.log(response)
            this.provinceOptions = response.data.data
            this.listLoading = false
          } else {
            this.$notify.error({
              title: '失败',
              message: response.data.msg,
              duration: 2000
            })
          }
        } else {
          this.$notify.error({
            title: '失败',
            message: response.data.msg,
            duration: 2000
          })
        }
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    getCityOfProvince(id) {
      this.listLoading = true
      fetchCity({ parentId: id, name: '' }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.cityOptions = response.data.data
            this.listLoading = false
          } else {
            this.$notify.error({
              title: '失败',
              message: response.data.msg,
              duration: 2000
            })
          }
        } else {
          this.$notify.error({
            title: '失败',
            message: response.data.msg,
            duration: 2000
          })
        }
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    getCountyOfCity(id) {
      this.listLoading = true
      fetchCounty({ parentId: id, name: '' }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.countyOptions = response.data.data
            this.listLoading = false
          } else {
            this.$notify.error({
              title: '失败',
              message: response.data.msg,
              duration: 2000
            })
          }
        } else {
          this.$notify.error({
            title: '失败',
            message: response.data.msg,
            duration: 2000
          })
        }
      })
        .catch(function(error) {
          console.log(error)
        })
    }
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
