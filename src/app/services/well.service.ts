import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Well } from '../models/well.model';

@Injectable({
  providedIn: 'root'
})
export class WellService {
  private mockWells: Well[] = [
    {
      id: '1',
      name: 'Well name',
      activity: 'Drilling',
      measuredDepth: 1000,
      unit: 'ft',
      activeAlarms: [
        { id: '1', name: 'Abnormal hookload', severity: 'high' },
        { id: '2', name: 'Abnormal hole cleaning index', severity: 'high' }
      ],
      packoffRisk: {
        score: 9.3,
        maxScore: 10
      },
      workflows: [
        { name: 'Drillstring integrity', status: 'valid' },
        { name: 'Drilling performance', status: 'valid' },
        { name: 'Torque & drag', status: 'action-needed' },
        { name: 'Drilling efficiency', status: 'valid' },
        { name: 'Well integrity', status: 'valid' }
      ],
      daysToTotalDepth: 14
    },
    {
      id: '2',
      name: 'Well name',
      activity: 'Drilling',
      measuredDepth: 1000,
      unit: 'ft',
      activeAlarms: [
        { id: '3', name: 'Abnormal hookload', severity: 'high' },
        { id: '4', name: 'Abnormal hole cleaning index', severity: 'high' }
      ],
      packoffRisk: {
        score: 9.3,
        maxScore: 10
      },
      workflows: [
        { name: 'Drillstring integrity', status: 'valid' },
        { name: 'Drilling performance', status: 'valid' },
        { name: 'Torque & drag', status: 'action-needed' },
        { name: 'Drilling efficiency', status: 'valid' },
        { name: 'Well integrity', status: 'valid' }
      ],
      daysToTotalDepth: 14
    },
    {
      id: '3',
      name: 'Well name',
      activity: 'Drilling',
      measuredDepth: 1000,
      unit: 'ft',
      activeAlarms: [
        { id: '5', name: 'Abnormal hookload', severity: 'high' },
        { id: '6', name: 'Abnormal hole cleaning index', severity: 'high' }
      ],
      packoffRisk: {
        score: 9.3,
        maxScore: 10
      },
      workflows: [
        { name: 'Drillstring integrity', status: 'valid' },
        { name: 'Drilling performance', status: 'valid' },
        { name: 'Torque & drag', status: 'action-needed' },
        { name: 'Drilling efficiency', status: 'valid' },
        { name: 'Well integrity', status: 'valid' }
      ],
      daysToTotalDepth: 14
    },
    {
      id: '4',
      name: 'Well name',
      activity: 'Drilling',
      measuredDepth: 1000,
      unit: 'ft',
      activeAlarms: [
        { id: '7', name: 'Abnormal hookload', severity: 'high' },
        { id: '8', name: 'Abnormal hole cleaning index', severity: 'high' }
      ],
      packoffRisk: {
        score: 9.3,
        maxScore: 10
      },
      workflows: [
        { name: 'Drillstring integrity', status: 'valid' },
        { name: 'Drilling performance', status: 'valid' },
        { name: 'Torque & drag', status: 'action-needed' },
        { name: 'Drilling efficiency', status: 'valid' },
        { name: 'Well integrity', status: 'valid' }
      ],
      daysToTotalDepth: 14
    }
  ];

  getWells(): Observable<Well[]> {
    return of(this.mockWells);
  }

  getWellById(id: string): Observable<Well | undefined> {
    const well = this.mockWells.find(w => w.id === id);
    return of(well);
  }
}
