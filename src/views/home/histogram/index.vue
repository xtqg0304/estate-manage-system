<template>
  <ve-histogram :width="width" :height="height" :data="chartData" :extend="vChartOptions"/>
</template>

<script>
import 'echarts/lib/component/title'
export default {
  data() {
    this.vChartOptions = {
      title: {
        show: true,
        text: '物业缴费',
        left: 'left',
        top: 10,
        textStyle: {
          color: '#00aeff',
          fontWeight: 'normal'
        }
      },
      legend: {
        show: false,
        type: 'plain',
        orient: 'horizontal',
        bottom: 10,
        left: 'center',
        textStyle: {
          color: '#00aeff'
        },
        pageTextStyle: '#00aeff'
      },
      colors: [
        '#0fc2d6', '#2087d7'
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
            color: '#2d3a4b',
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
            color: '#2d3a4b',
            width: 2
          }
        },
        axisLabel: {
          show: true,
          inside: false,
          color: '#fff',
          rotate: 45
        }
      },
      'yAxis.0': {
        show: true,
        type: 'value',
        nameRotate: null,
        inverse: false,
        nameTextStyle: {
          color: '#bfcbd9'
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          length: 5,
          inside: false,
          lineStyle: {
            color: '#2d3a4b',
            width: 2,
            type: 'solid'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#448bcb',
            width: 1,
            type: 'solid',
            opacity: 0.8
          }
        },
        axisLine: {
          show: true,
          onZero: true,
          lineStyle: {
            color: '#2d3a4b',
            width: 2
          }
        },
        axisLabel: {
          show: true,
          inside: false,
          color: '#fff'
        }
      },
      series: {
        barMaxWidth: 10
      },
      toolbox: {
        show: true,
        orient: 'horizontal',
        feature: {
          saveAsImage: { show: true, iconStyle: { borderColor: '#fff' }}
        },
        color: '#00aeff'
      }
    }
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 13, '下单用户': 10, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 30, '下单用户': 30, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 23, '下单用户': 23, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 13, '下单用户': 13, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 32, '下单用户': 32, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 43, '下单用户': 42, '下单率': 0.78 }
        ]
      },
      loading: false,
      dataEmpty: false,
      width: '100%',
      height: '100%'
    }
  }
}
</script>
