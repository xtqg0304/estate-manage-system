<script>
export default {
  beforeCreate() {
    debugger
    const path = this.$route.params.path
    this.$router.replace('/' + path)
  },
  render: function(h) {
    debugger
    return h() // avoid warning message
  }
}
</script>
