/**
 * Created by saruni on 1/9/18.
 */

import {CommonService } from './common.service';
import {StudentPrediction} from "../models/intelligence.models";
import {Observable} from "rxjs";

export class PredictionService extends CommonService {
  private predictionsUrl: string = 'intelligence/';
  private studentPredictionsUrl: string = this.predictionsUrl + 'students/';

  getStudentPredictions(q?: string, student?: string): Observable<StudentPrediction[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('q', q);
    return this.makeRequest(this.studentPredictionsUrl, 'GET', null, params);
  }

}
