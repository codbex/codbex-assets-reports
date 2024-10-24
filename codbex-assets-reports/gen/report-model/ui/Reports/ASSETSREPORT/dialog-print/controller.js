angular.module('page', ["ideUI", "ideView", "entityApi"])
    .config(["messageHubProvider", function (messageHubProvider) {
        messageHubProvider.eventIdPrefix = 'codbex-assets-reports.Reports.ASSETSREPORT';
    }])
    .config(["entityApiProvider", function (entityApiProvider) {
        entityApiProvider.baseUrl = "/services/ts/codbex-assets-reports/gen/report-model/api/ASSETSREPORT/ASSETSREPORTService.ts";
    }])
    .controller('PageController', ['$scope', 'messageHub', 'entityApi', 'ViewParameters', function ($scope, messageHub, entityApi, ViewParameters) {

		let params = ViewParameters.get();
		if (Object.keys(params).length) {         
            const filterEntity = params.filterEntity ?? {};

			const filter = {
			};

            $scope.filter = filter;
		}

        $scope.loadPage = function (filter) {
            if (!filter && $scope.filter) {
                filter = $scope.filter;
            }
            let request;
            if (filter) {
                request = entityApi.search(filter);
            } else {
                request = entityApi.list();
            }
            request.then(function (response) {
                if (response.status != 200) {
                    messageHub.showAlertError("ASSETSREPORT", `Unable to list/filter ASSETSREPORT: '${response.message}'`);
                    return;
                }

                response.data.forEach(e => {
                    if (e['maintenanceMaintenancedate']) {
                        e['maintenanceMaintenancedate'] = new Date(e['maintenanceMaintenancedate']);
                    }
                    if (e['valuationValuationdate']) {
                        e['valuationValuationdate'] = new Date(e['valuationValuationdate']);
                    }
                    if (e['depreciationDepreciationdate']) {
                        e['depreciationDepreciationdate'] = new Date(e['depreciationDepreciationdate']);
                    }
                });

                $scope.data = response.data;
                setTimeout(() => {
                    window.print();

                }, 250);
            });
        };
        $scope.loadPage($scope.filter);

        window.onafterprint = () => {
            messageHub.closeDialogWindow("codbex-assets-reports-Reports-ASSETSREPORT-print");
        }

    }]);
