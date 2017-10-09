/**
 * Created by saruni on 8/2/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var SampleGraphsComponent = (function () {
    function SampleGraphsComponent() {
        // lineChart
        this.lineChartData = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 90, 86, 27, 90],
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartType = 'line';
        this.lineChartType1 = 'bar';
        this.pieChartType = 'pie';
        this.pieChartType1 = 'doughnut';
        // Pie
        this.pieChartLabels = ['Maths', 'Physics', 'Biology', 'Chemistry', 'English'];
        this.pieChartData = [90, 80, 70, 67, 88];
        // lineChart
        this.lineChartData1 = [
            { data: [90, 99, 80, 81, 89, 90, 88], label: 'English' },
            { data: [80, 74, 71, 82, 86, 69, 75], label: 'Maths' },
            { data: [80, 74, 71, 82, 86, 69, 75], label: 'Chemistry' },
            { data: [90, 89, 80, 76, 89, 75, 88], label: 'Biology' }
        ];
        this.lineChartLabels1 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType2 = 'line';
    }
    SampleGraphsComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            $('.ui.dropdown').dropdown();
        });
    };
    SampleGraphsComponent.prototype.randomizeType = function () {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
        this.lineChartType1 = this.lineChartType1 === 'line' ? 'bar' : 'line';
        this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
        this.pieChartType1 = this.pieChartType1 === 'doughnut' ? 'pie' : 'doughnut';
    };
    SampleGraphsComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    SampleGraphsComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    SampleGraphsComponent.prototype.randomize = function () {
        var _lineChartData = new Array(this.lineChartData1.length);
        for (var i = 0; i < this.lineChartData1.length; i++) {
            _lineChartData[i] = { data: new Array(this.lineChartData1[i].data.length), label: this.lineChartData1[i].label };
            for (var j = 0; j < this.lineChartData1[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData1 = _lineChartData;
    };
    // events
    SampleGraphsComponent.prototype.chartClicked1 = function (e) {
        console.log(e);
    };
    SampleGraphsComponent.prototype.chartHovered1 = function (e) {
        console.log(e);
    };
    return SampleGraphsComponent;
}());
SampleGraphsComponent = __decorate([
    core_1.Component({
        selector: 'sample-graphs',
        templateUrl: './sample-graphs.component.html',
        styleUrls: ['./sample-graphs.component.css']
    })
], SampleGraphsComponent);
exports.SampleGraphsComponent = SampleGraphsComponent;
//# sourceMappingURL=sample-graphs.component.js.map