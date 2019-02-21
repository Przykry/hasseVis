import * as request from 'superagent';
import config from './dev';
import { CellType } from './table/TableModel';

export class HasseDiagramApi {
    static normalizeValues(table: CellType[][]) {
        return request.post("api/normalizeValues")
            .type('application/json')
            .send(JSON.stringify(table))
            .then(x => {
                return x.body as CellType[][];
            });
    }

    static getGraph(table: CellType[][]) {
        return request.post("api/hasseDiagram")
            .type('application/json')
            .send(JSON.stringify(table));
    }
}

export default HasseDiagramApi;