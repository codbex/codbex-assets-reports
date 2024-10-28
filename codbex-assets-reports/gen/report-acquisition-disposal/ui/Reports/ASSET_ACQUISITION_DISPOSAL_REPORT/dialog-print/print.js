const viewData = {
    id: 'codbex-assets-reports-Reports-ASSET_ACQUISITION_DISPOSAL_REPORT-print',
    label: 'Print',
    link: '/services/web/codbex-assets-reports/gen/report-acquisition-disposal/ui/Reports/ASSET_ACQUISITION_DISPOSAL_REPORT/dialog-print/index.html',
    perspective: 'Reports',
    view: 'ASSET_ACQUISITION_DISPOSAL_REPORT',
    type: 'page',
    order: 10
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}