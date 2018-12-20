<template>
  <ve-ring :loading="loading"
           :data-empty="dataEmpty"
           :data="chartData"
           :settings="chartSettings"
           :extend="vChartOptions"
           :colors="vChartOptions.colors"
           :width="width"
           :height="height" />
</template>

<script>
export default {
  props: {
    ringdata: {
      type: Object,
      default: function() { }
    }
  },
  data() {
    this.chartSettings = {
      roseType: 'radius',
      limitShowNum: 10,
      dataType: 'KMB',
      radius: [20, 60],
      offsetY: 100
    }
    this.vChartOptions = {
      grid: {
        show: false,
        x: 5,
        x2: 5,
        y: 40,
        y2: 0,
        height: '50%'
      },
      title: {
        show: true,
        text: '',
        left: 'left',
        top: 10,
        textStyle: {
          color: '#bfcbd9',
          fontWeight: 'normal',
          fontSize: 16
        }
      },
      legend: {
        show: false,
        type: 'plain',
        orient: 'horizontal',
        top: 10,
        left: 'center',
        textStyle: {
          color: '#00aeff'
        },
        pageTextStyle: '#00aeff'
      },
      colors: [
        '#407fff', '#a682e6', '#00cccd', '#db5c6d', '#f59956', '#c8b2f4'
      ],
      series: {
        barMaxWidth: 20,
        type: 'pie'
      },
      toolbox: {
        show: true,
        orient: 'horizontal',
        feature: {
          saveAsImage: {
            show: true,
            iconStyle: { borderColor: '#fff' }
          }
        },
        color: '#00aeff'
      }
    }
    return {
      chartData: {
        columns: [],
        rows: []
      },
      loading: false,
      dataEmpty: false,
      width: '100%',
      height: '100%'
    }
  },
  watch: {
    ringdata(oldValue, newValue) {
      this.getData()
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      if (this.ringdata.chartData) {
        this.vChartOptions.title.text = this.ringdata.vChartOptions.title.text
        this.chartData = this.ringdata.chartData.rows.length ? Object.assign({}, this.ringdata.chartData) : Object.assign({}, this.chartData)
        this.dataEmpty = !this.chartData.rows.length
        this.loading = false
      }
    }
  }
}
</script>
