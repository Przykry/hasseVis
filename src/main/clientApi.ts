import * as request from 'superagent';
import { CellType } from './table/TableModel';
import { CriterionEstimation } from './models';

export interface HasseRequest {
    table: CellType[][];
    criterionEstimation: number;
    isNormalized: boolean;
}

export class HasseDiagramApi {
    static normalizeValues(table: CellType[][]) {
        return request.post("api/normalizeValues")
            .type('application/json')
            .send(JSON.stringify(table))
            .then(x => {
                return x.body as CellType[][];
            });
    }

    static getGraph(req: HasseRequest) {
        return request.post("api/hasseDiagram")
            .type('application/json')
            .send(JSON.stringify(req));
    }
}

export default HasseDiagramApi;