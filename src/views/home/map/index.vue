<template>
  <ve-map :data="chartData" :settings="chartSettings" :extend="extend" :events="chartEvents"/>
</template>

<script>
import China from 'echarts/map/json/china.json'
export default {
  data() {
    this.chartEvents = {
      click: (v) => {
        this.cityName = v.name
      }
    }
    this.chartSettings = {
      mapOrigin: China,
      selectedMode: 'single',
      dimension: '位置',
      metrics: ['人口', '面积'],
      dataType: {
        '面积': 'KMB'
      },
      label: {
        normal: {
          show: false,
          color: '#adc1dc'
        },
        emphasis: {
          color: '#1c3450'
        }
      },
      itemStyle: {
        normal: {
          borderColor: '#00b7b4',
          areaColor: '#1c3450'
        },
        emphasis: {
          areaColor: '#00b7b4'
        }
      }
    }
    this.extend = {
      legend: {
        show: false
      }
    }
    return {
      chartData: {
        columns: ['位置', '税收', '人口', '面积'],
        rows: [
          { '位置': '吉林', '税收': 123, '人口': 123, '面积': 92134 },
          { '位置': '北京', '税收': 1223, '人口': 2123, '面积': 29234 },
          { '位置': '上海', '税收': 2123, '人口': 1243, '面积': 94234 },
          { '位置': '浙江', '税收': 4123, '人口': 5123, '面积': 29234 }
        ]
      }
    }
  }
}
</script>
