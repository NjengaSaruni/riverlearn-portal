/**
 * Created by saruni on 10/17/17.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'results',
  templateUrl: './exam-results-component.html',
  styleUrls: ['./exam-results-component.css']
})
export class ExamResultsComponent {
  chartOption = {
    title: {
      text: 'Exam results this year'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Maths', 'English', 'Science', 'Chemistry', 'Biology']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Maths',
        type: 'bar',
        stack: '总量',
        areaStyle: {normal: {}},
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'English',
        type: 'bar',
        stack: '总量',
        areaStyle: {normal: {}},
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Science',
        type: 'bar',
        stack: '总量',
        areaStyle: {normal: {}},
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Chemistry',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Biology',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        areaStyle: {normal: {}},
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };

}
