/**
 * 
 */
app
	.controller(
	'holidayController',
	[
		'$scope', 'holidayService','DTOptionsBuilder','DTColumnDefBuilder',
		function ($scope, holidayService,DTOptionsBuilder, DTColumnDefBuilder) {
			var self = this;

			self.holiday = new holidayService();
			self.holidays = [];

			self.fetchAllHolidays = function () {
				self.holidays = holidayService.query();
			};


			self.fetchAllHolidays();
			self.dtOptions = DTOptionsBuilder.newOptions()
			.withOption('order', [1, 'asc']);
			self.dtColumnDefs = [
				DTColumnDefBuilder.newColumnDef(0).notSortable(),
				DTColumnDefBuilder.newColumnDef(1).withOption('type', 'date-range'),
				DTColumnDefBuilder.newColumnDef(2).notSortable(),
				DTColumnDefBuilder.newColumnDef(3).notSortable()
			];


		}]);