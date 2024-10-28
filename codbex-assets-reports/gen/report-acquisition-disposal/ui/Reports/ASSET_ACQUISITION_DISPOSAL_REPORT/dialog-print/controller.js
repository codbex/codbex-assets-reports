angular.module('page', ["ideUI", "ideView", "entityApi"])
    .config(["messageHubProvider", function (messageHubProvider) {
        messageHubProvider.eventIdPrefix = 'codbex-assets-reports.Reports.ASSET_ACQUISITION_DISPOSAL_REPORT';
    }])
    .config(["entityApiProvider", function (entityApiProvider) {
        entityApiProvider.baseUrl = "/services/ts/codbex-assets-reports/gen/report-acquisition-disposal/api/ASSET_ACQUISITION_DISPOSAL_REPORT/ASSET_ACQUISITION_DISPOSAL_REPORTService.ts";
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
                    messageHub.showAlertError("ASSET_ACQUISITION_DISPOSAL_REPORT", `Unable to list/filter ASSET_ACQUISITION_DISPOSAL_REPORT: '${response.message}'`);
                    return;
                }

                response.data.forEach(e => {
                    if (e['acquisitionDate']) {
                        e['acquisitionDate'] = new Date(e['acquisitionDate']);
                    }
                    if (e['disposalDate']) {
                        e['disposalDate'] = new Date(e['disposalDate']);
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
            messageHub.closeDialogWindow("codbex-assets-reports-Reports-ASSET_ACQUISITION_DISPOSAL_REPORT-print");
        }

    }]);
