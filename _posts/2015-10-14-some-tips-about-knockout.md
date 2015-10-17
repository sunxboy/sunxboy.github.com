---
layout: post
title: "knockout小技巧"
description: "knockout小技巧"
category: 技术
tags: [knockout]
---

### 优化的compute,仅当被调用时，才进行计算

		self._total_output_power = ko.computed(function () {
			var total = 0;
			ko.utils.arrayForEach(self._outputData(), function (output) {
				total += parseFloat(output.outputPower());
			});

			return total;
		}, this, { deferEvaluation: true });// calculate only when access


### knockout与bootstrap datepicker的绑定实现日期与后台绑定对象同步更新，与日期界面任意切换。

```javascript
ko.bindingHandlers.datepickercontrol = {
			init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				var binding = allBindingsAccessor();
				var options = {
					format: 'yyyy-mm-dd',
					language: "zh-CN",
					autoclose: true,
					todayBtn: 'linked',
					calendarWeeks: true,
					todayHighlight: true
				};

				if (binding.
) {
					options = $.extend(options, binding.datePickerOptions);
				}

				$(element).datepicker(options).on('changeDate', function(ev){
					valueAccessor()(ev.date);// update report_date
				});

				ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
					$(element).datepicker("destroy");
				});
			},
			update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

				// update period model view when switch period "days" / "months" / "years"
				var newPeriodView = parseInt($(element).attr('data-date-min-view-mode'), 10);
				var cachedPeriodView = parseInt($(element).data("dateMinViewMode"), 10);
				// check period view if changed or not
				if(newPeriodView - cachedPeriodView) {
					// update cache data
					$(element).data("dateMinViewMode", newPeriodView);

					$(element).data("datepicker")._process_options({minViewMode: newPeriodView});
					$(element).data("datepicker").showMode(0 - (Math.abs(newPeriodView - cachedPeriodView)));
				}

				$(element).datepicker("update", ko.unwrap(valueAccessor()));
			}
		};
```

以上这是绑定部分 `ko plugins` 的代码

页面对 `ko plugins` 的引用

	<input data-bind="attr: { 'data-date-min-view-mode' : dateViewMode }, datepickercontrol: report_date" type="text" class="form-control datepickercontrol input-sm" readOnly style="width: 105px;">

对应 model 的代码

```javascript
function DayPeriod() {
	var self = this;
	self.periodName = "日报表";
	self.periodValue= "date_trend_report";
	self.periodCurrent = "今天";
	self.periodView = 0;
}
function MonthPeriod() {
	var self = this;
	self.periodName = "月报表";
	self.periodValue= "month_trend_report";
	self.periodCurrent = "这个月";
	self.periodView = 1;
}
function YearPeriod() {
	var self = this;
	self.periodName = "年报表";
	self.periodValue= "year_trend_report";
	self.periodCurrent = "今年";
	self.periodView = 2;
}

DayPeriod.prototype.getCurrent = function() {return moment().toDate();};
DayPeriod.prototype.getPrevious = function(reportDate) {return moment(reportDate).subtract(1, 'day').toDate();};
DayPeriod.prototype.getNext = function(reportDate) {return moment(reportDate).add(1, 'day').toDate();};
DayPeriod.prototype.getTitleDate = function(reportDate) {return moment(reportDate).format('YYYY-MM-DD');};

MonthPeriod.prototype.getCurrent = function() {return moment().date(1).toDate();};
MonthPeriod.prototype.getPrevious = function(reportDate) {return moment(reportDate).date(1).subtract(1, 'month').toDate();};
MonthPeriod.prototype.getNext = function(reportDate) {return moment(reportDate).date(1).add(1, 'month').toDate();};
MonthPeriod.prototype.getTitleDate = function(reportDate) {return moment(reportDate).format('YYYY-MM');};

YearPeriod.prototype.getCurrent = function() {return moment().dayOfYear(1).toDate();};
YearPeriod.prototype.getPrevious = function(reportDate) {return moment(reportDate).date(1).month(0).subtract(1, 'year').toDate();};
YearPeriod.prototype.getNext = function(reportDate) {return moment(reportDate).date(1).month(0).add(1, 'year').toDate();};
YearPeriod.prototype.getTitleDate = function(reportDate) {return moment(reportDate).format('YYYY');};

function EnergyChart() {
	var self = this;
	self.modelTitle = ko.observable();

	self.selectedDevice = ko.observable();

	self.Periods = ko.pureComputed(function () {
		if (self.chartType() === 'output_power') {
			return [
				new DayPeriod()
			];
		}

		return [
			new DayPeriod(),
			new MonthPeriod(),
			new YearPeriod()
		];

	});

	self.currentPeriod = ko.observable(DayPeriod.prototype);

	// plugin: datepickercontrol binded
	// the actual report date, when click next or previous button, will change this
	self.report_date = ko.observable(moment().format("YYYY-MM-DD"));

	// plugin: datepickercontrol binded, need refresh datepicker
	// 0: day view, 1: month view, 2: year view
	self.dateViewMode = ko.pureComputed(function() {
		return self.currentPeriod().periodView || 0;
	});

	self.report_type = ko.pureComputed(function() {
		return self.currentPeriod().periodValue || "date_trend_report";
	});

	self.gotoCurrentPeriod = function() {
		self.report_date(self.currentPeriod().getCurrent());
	};
	self.previous_date = function() {
		self.report_date(self.currentPeriod().getPrevious(self.report_date()))
	};
	self.next_date = function() {
		self.report_date(self.currentPeriod().getNext(self.report_date()))
	};

	// periods: Day/Month/Year
	self.selectedPeriod =  function(period) {
		self.currentPeriod(period);

		self.gotoCurrentPeriod();
	};
	self.report_date.subscribe(function(newValue) {
		self.searchReport();
	});
```
	
首先这里面有几大亮点：
1. 可以通过datePickerOptions ，在页面上对初始化参数进行扩展。
2. 通过changeDate事件，当日期选择改变时，对应的绑定对象也进行同步改变
3. 在ko update中当绑定对象的值发生变化时，也同步到对象的日期对象上。注意这里用的是update，而不是setDate.
是因为setDate会再次触发changeDate事件，在changeDate事件中修改绑定对象值时，又会触发ko update.
而datepicker("update")不会出现此种问题。
4. 当vidwMode发生改变时，界面上如何对应更新？bootstrap-datepicker 是没有对应的API的。
比较通常的做法是remove掉，再重新new 一个datepicker.但这样非常不好，而且changeDate事件触发上会有很多问题。
这里直接调用了一个私有的方法_process_options({minViewMode: newPeriodView});可以解决viewMode的更新问题，但是界面上的更新有一个延迟，此处提供了一个较为完善的解决办法，先比较两次viewMode的大小，取负，然后再传入并调用showMode方法就可以了。