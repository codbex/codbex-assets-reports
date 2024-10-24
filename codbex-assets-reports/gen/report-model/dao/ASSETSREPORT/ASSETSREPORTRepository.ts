import { Query, NamedQueryParameter } from "sdk/db";

export interface ASSETSREPORT {
    readonly 'assetName': string;
    readonly 'assetValue': number;
    readonly 'assetAccumulatedvalue': number;
    readonly 'assetMaintenencecost': number;
    readonly 'maintenanceAsset': number;
    readonly 'maintenanceMaintenancedate': Date;
    readonly 'maintenanceDescription': string;
    readonly 'maintenanceCost': number;
    readonly 'valuationAsset': number;
    readonly 'valuationValuationdate': Date;
    readonly 'valuationValuedat': number;
    readonly 'depreciationAsset': number;
    readonly 'depreciationDepreciationdate': Date;
    readonly 'depreciationAnnualdepreciation': number;
    readonly 'depreciationAccumulateddepreciation': number;
}

export interface ASSETSREPORTFilter {
}

export interface ASSETSREPORTPaginatedFilter extends ASSETSREPORTFilter {
    readonly "$limit"?: number;
    readonly "$offset"?: number;
}

export class ASSETSREPORTRepository {

    private readonly datasourceName?: string;

    constructor(datasourceName?: string) {
        this.datasourceName = datasourceName;
    }

    public findAll(filter: ASSETSREPORTPaginatedFilter): ASSETSREPORT[] {
        const sql = `
            SELECT CODBEX_ASSET.ASSET_NAME as "assetName", CODBEX_ASSET.ASSET_VALUE as "assetValue", CODBEX_ASSET.ASSET_ACCUMULATEDVALUE as "assetAccumulatedvalue", CODBEX_ASSET.ASSET_MAINTENENCECOST as "assetMaintenencecost", CODBEX_MAINTENANCE.MAINTENANCE_ASSET as "maintenanceAsset", CODBEX_MAINTENANCE.MAINTENANCE_MAINTENANCEDATE as "maintenanceMaintenancedate", CODBEX_MAINTENANCE.MAINTENANCE_DESCRIPTION as "maintenanceDescription", CODBEX_MAINTENANCE.MAINTENANCE_COST as "maintenanceCost", CODBEX_VALUATION.VALUATION_ASSET as "valuationAsset", CODBEX_VALUATION.VALUATION_VALUATIONDATE as "valuationValuationdate", CODBEX_VALUATION.VALUATION_VALUEDAT as "valuationValuedat", CODBEX_DEPRECIATION.DEPRECIATION_ASSET as "depreciationAsset", CODBEX_DEPRECIATION.DEPRECIATION_DEPRECIATIONDATE as "depreciationDepreciationdate", CODBEX_DEPRECIATION.DEPRECIATION_ANNUALDEPRECIATION as "depreciationAnnualdepreciation", CODBEX_DEPRECIATION.DEPRECIATION_ACCUMULATEDDEPRECIATION as "depreciationAccumulateddepreciation"
            FROM CODBEX_ASSET as CODBEX_ASSET
              INNER JOIN CODBEX_MAINTENANCE CODBEX_MAINTENANCE ON CODBEX_ASSET.ASSET_ID = CODBEX_MAINTENANCE.MAINTENANCE_ID
              INNER JOIN CODBEX_VALUATION CODBEX_VALUATION ON CODBEX_ASSET.ASSET_ID = CODBEX_VALUATION.VALUATION_ID
              INNER JOIN CODBEX_DEPRECIATION CODBEX_DEPRECIATION ON CODBEX_ASSET.ASSET_ID = CODBEX_DEPRECIATION.DEPRECIATION_ID
            ${Number.isInteger(filter.$limit) ? ` LIMIT ${filter.$limit}` : ''}
            ${Number.isInteger(filter.$offset) ? ` OFFSET ${filter.$offset}` : ''}
        `;

        const parameters: NamedQueryParameter[] = [];

        return Query.executeNamed(sql, parameters, this.datasourceName);
    }

    public count(filter: ASSETSREPORTFilter): number {
        const sql = `
            SELECT COUNT(*) as REPORT_COUNT FROM (
                SELECT CODBEX_ASSET.ASSET_NAME as "assetName", CODBEX_ASSET.ASSET_VALUE as "assetValue", CODBEX_ASSET.ASSET_ACCUMULATEDVALUE as "assetAccumulatedvalue", CODBEX_ASSET.ASSET_MAINTENENCECOST as "assetMaintenencecost", CODBEX_MAINTENANCE.MAINTENANCE_ASSET as "maintenanceAsset", CODBEX_MAINTENANCE.MAINTENANCE_MAINTENANCEDATE as "maintenanceMaintenancedate", CODBEX_MAINTENANCE.MAINTENANCE_DESCRIPTION as "maintenanceDescription", CODBEX_MAINTENANCE.MAINTENANCE_COST as "maintenanceCost", CODBEX_VALUATION.VALUATION_ASSET as "valuationAsset", CODBEX_VALUATION.VALUATION_VALUATIONDATE as "valuationValuationdate", CODBEX_VALUATION.VALUATION_VALUEDAT as "valuationValuedat", CODBEX_DEPRECIATION.DEPRECIATION_ASSET as "depreciationAsset", CODBEX_DEPRECIATION.DEPRECIATION_DEPRECIATIONDATE as "depreciationDepreciationdate", CODBEX_DEPRECIATION.DEPRECIATION_ANNUALDEPRECIATION as "depreciationAnnualdepreciation", CODBEX_DEPRECIATION.DEPRECIATION_ACCUMULATEDDEPRECIATION as "depreciationAccumulateddepreciation"
                FROM CODBEX_ASSET as CODBEX_ASSET
                  INNER JOIN CODBEX_MAINTENANCE CODBEX_MAINTENANCE ON CODBEX_ASSET.ASSET_ID = CODBEX_MAINTENANCE.MAINTENANCE_ID
                  INNER JOIN CODBEX_VALUATION CODBEX_VALUATION ON CODBEX_ASSET.ASSET_ID = CODBEX_VALUATION.VALUATION_ID
                  INNER JOIN CODBEX_DEPRECIATION CODBEX_DEPRECIATION ON CODBEX_ASSET.ASSET_ID = CODBEX_DEPRECIATION.DEPRECIATION_ID
            )
        `;

        const parameters: NamedQueryParameter[] = [];

        return Query.executeNamed(sql, parameters, this.datasourceName)[0].REPORT_COUNT;
    }

}