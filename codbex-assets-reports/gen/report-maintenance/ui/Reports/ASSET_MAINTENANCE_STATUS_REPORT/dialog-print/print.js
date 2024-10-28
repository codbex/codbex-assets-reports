const viewData = {
    id: 'codbex-assets-reports-Reports-ASSET_MAINTENANCE_STATUS_REPORT-print',
    label: 'Print',
    link: '/services/web/codbex-assets-reports/gen/report-maintenance/ui/Reports/ASSET_MAINTENANCE_STATUS_REPORT/dialog-print/index.html',
    perspective: 'Reports',
    view: 'ASSET_MAINTENANCE_STATUS_REPORT',
    type: 'page',
    order: 10
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}