const viewData = {
    id: 'codbex-assets-reports-Reports-ASSETSREPORT-print',
    label: 'Print',
    link: '/services/web/codbex-assets-reports/gen/report-model/ui/Reports/ASSETSREPORT/dialog-print/index.html',
    perspective: 'Reports',
    view: 'ASSETSREPORT',
    type: 'page',
    order: 10
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}