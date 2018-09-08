<template>
  <div>
    <div style="margin-bottom:15px;"> {{ roles }}</div>
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="estate" />
      <el-radio-button label="pay" />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        this.$store.dispatch('ChangeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
