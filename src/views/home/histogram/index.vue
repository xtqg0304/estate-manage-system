<template>
  <ve-histogram :loading="loading" :data-empty="dataEmpty" :width="width" :height="height" :data="chartData" :extend="vChartOptions" :colors="vChartOptions.colors" />
</template>

<script>
import 'echarts/lib/component/title'
export default {
  props: {
    histogramdata: {
      type: Object,
      default: function() {}
    }
  },
  data() {
    this.vChartOptions = {
      grid: {
        show: false,
        x: 5,
        x2: 5,
        y: 40,
        y2: 0,
        height: '65%'
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
        '#63c2ff', '#2ec7c9', '#c8b2f4', '#ffcb8c', '#ed868c', '#c8b2f4'
      ],
      xAxis: {
        show: true,
        type: 'category',
        inverse: false,
        axisTick: {
          show: true,
          alignWithLabel: true,
          length: 5,
          inside: false,
          lineStyle: {
            color: '#606266',
            width: 2,
            type: 'solid'
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          onZero: true,
          lineStyle: {
            color: '#606266',
            width: 2
          }
        },
        axisLabel: {
          show: true,
          inside: false,
          color: '#606266',
          rotate: 0
        }
      },
      'yAxis.0': {
        show: true,
        type: 'value',
        nameRotate: null,
        inverse: false,
        nameTextStyle: {
          color: '#606266'
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          length: 5,
          inside: false,
          lineStyle: {
            color: '#606266',
            width: 2,
            type: 'solid'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#606266',
            width: 1,
            type: 'solid',
            opacity: 0.8
          }
        },
        axisLine: {
          show: true,
          onZero: true,
          lineStyle: {
            color: '#606266',
            width: 2
          }
        },
        axisLabel: {
          show: true,
          inside: false,
          color: '#606266'
        }
      },
      series: {
        barMaxWidth: 20
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
    histogramdata(oldValue, newValue) {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      if (this.histogramdata.chartData) {
        this.vChartOptions.title.text = this.histogramdata.vChartOptions.title.text
        this.chartData = this.histogramdata.chartData.rows.length ? Object.assign({}, this.histogramdata.chartData) : Object.assign({}, this.chartData)
        this.dataEmpty = !this.chartData.rows.length
        this.loading = false
      }
    }
  }

}
</script>
