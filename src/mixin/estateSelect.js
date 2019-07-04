import { getBuildingList, getRoomList } from '@/api/property' // 获取房产信息列表
const estateSelectMixin = {
  methods: {
    _getRoomList() {
      getBuildingList({ id: this.communityId }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            const buildings = response.data.data
            const roomList = buildings.map(v => {
              v.label = v.buildingName
              v.value = v.id
              v.children = []
              return v
            })
            for (let i = 0; i < roomList.length; i++) {
              getRoomList({
                communityId: this.communityId,
                buildingId: roomList[i].id
              }).then(response => {
                if (response.status === 200) {
                  if (response.data.code === 200) {
                    const rooms = response.data.data
                    roomList[i].children = rooms.map(v => {
                      v.label = v.room
                      v.value = v.id
                      return v
                    })
                  }
                }
              })
            }
            this.$store.commit('SET_ROOMLIST', roomList)
          }
        }
      })
    }
  }
}
const estateSelectLazyLoadMixin = {
  methods: {
    getBuilding() {
      getBuildingList({ id: this.communityId }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            const items = response.data.data
            this.buildings = items.map(v => {
              v.label = v.buildingName
              v.value = v.id
              v.children = []
              return v
            })
          }
        }
      })
    },
    handleChange(value) {
      getRoomList({ communityId: this.communityId, buildingId: value[0] }).then(
        response => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              for (const v of this.buildings) {
                // 更新后的值插入原来数据的位置
                if (v.id === value[0]) {
                  const building = Object.assign({}, v)
                  const items = response.data.data
                  building.children = items.map(v => {
                    v.label = v.room
                    v.value = v.id
                    return v
                  })
                  const index = this.buildings.indexOf(v)
                  this.buildings.splice(index, 1, building)
                  break
                }
              }
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
        }
      )
    }
  }
}
export { estateSelectMixin, estateSelectLazyLoadMixin }
