import MSSqlconfig from "../config/MsSqlConfig";
import mssql from 'mssql';



class ThresholdService {

    public getThresholdDataMSSQL(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = await mssql.connect(MSSqlconfig);
                const products = await pool.request().query("SELECT * from percentageThreshold");
                resolve(products.recordsets);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
    
}

export default new ThresholdService;
