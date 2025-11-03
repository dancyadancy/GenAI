import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alarm, Well, WorkflowStatus } from '../models/well.model';

@Injectable({
  providedIn: 'root'
})
export class WellService implements OnDestroy {
  private readonly updateIntervalMs = 3000;

  private readonly baseWells: Well[] = [
    {
      id: '1',
      name: 'North Sea A-1',
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
      name: 'Permian B-6',
      activity: 'Drilling',
      measuredDepth: 980,
      unit: 'ft',
      activeAlarms: [
        { id: '3', name: 'Abnormal hookload', severity: 'medium' },
        { id: '4', name: 'Bit bounce detected', severity: 'low' }
      ],
      packoffRisk: {
        score: 7.8,
        maxScore: 10
      },
      workflows: [
        { name: 'Drillstring integrity', status: 'valid' },
        { name: 'Drilling performance', status: 'action-needed' },
        { name: 'Torque & drag', status: 'valid' },
        { name: 'Drilling efficiency', status: 'valid' },
        { name: 'Well integrity', status: 'valid' }
      ],
      daysToTotalDepth: 11
    },
    {
      id: '3',
      name: 'Gulf C-21',
      activity: 'Circulating',
      measuredDepth: 1025,
      unit: 'ft',
      activeAlarms: [
        { id: '5', name: 'Abnormal hole cleaning index', severity: 'medium' }
      ],
      packoffRisk: {
        score: 6.5,
        maxScore: 10
      },
      workflows: [
        { name: 'Drillstring integrity', status: 'valid' },
        { name: 'Drilling performance', status: 'valid' },
        { name: 'Torque & drag', status: 'valid' },
        { name: 'Drilling efficiency', status: 'valid' },
        { name: 'Well integrity', status: 'action-needed' }
      ],
      daysToTotalDepth: 17
    },
    {
      id: '4',
      name: 'Eagle Ford D-4',
      activity: 'Sliding',
      measuredDepth: 960,
      unit: 'ft',
      activeAlarms: [
        { id: '7', name: 'Stick-slip detected', severity: 'high' },
        { id: '8', name: 'RPM fluctuation', severity: 'medium' }
      ],
      packoffRisk: {
        score: 8.9,
        maxScore: 10
      },
      workflows: [
        { name: 'Drillstring integrity', status: 'action-needed' },
        { name: 'Drilling performance', status: 'valid' },
        { name: 'Torque & drag', status: 'valid' },
        { name: 'Drilling efficiency', status: 'valid' },
        { name: 'Well integrity', status: 'valid' }
      ],
      daysToTotalDepth: 9
    }
  ];

  private readonly wellsSubject = new BehaviorSubject<Well[]>(this.cloneWells(this.baseWells));
  private updatesSubscription: Subscription;

  constructor() {
    this.updatesSubscription = interval(this.updateIntervalMs).subscribe(() => {
      const nextSnapshot = this.wellsSubject.value.map(well => this.generateUpdatedWell(well));
      this.wellsSubject.next(nextSnapshot);
    });
  }

  getWells(): Observable<Well[]> {
    return this.wellsSubject.asObservable();
  }

  getWellById(id: string): Observable<Well | undefined> {
    return this.wellsSubject.asObservable().pipe(
      map(wells => wells.find(well => well.id === id))
    );
  }

  ngOnDestroy(): void {
    this.updatesSubscription?.unsubscribe();
  }

  private generateUpdatedWell(well: Well): Well {
    const secondsPerInterval = this.updateIntervalMs / 1000;
    const measuredDepthDelta = secondsPerInterval * this.randomFloat(0.8, 1.2);
    const packoffDelta = this.randomFloat(-0.4, 0.4);
    const daysDelta = Math.random() < 0.35 ? -1 : 0;

    const updatedAlarms = well.activeAlarms.map(alarm => ({
      ...alarm,
      severity: this.randomizeSeverity(alarm.severity)
    }));

    const updatedWorkflows = well.workflows.map(workflow => ({
      ...workflow,
      status: this.randomizeWorkflowStatus(workflow.status)
    }));

    return {
      ...well,
      measuredDepth: Math.max(0, parseFloat((well.measuredDepth + measuredDepthDelta).toFixed(1))),
      packoffRisk: {
        ...well.packoffRisk,
        score: this.clamp(parseFloat((well.packoffRisk.score + packoffDelta).toFixed(1)), 0, well.packoffRisk.maxScore)
      },
      activeAlarms: updatedAlarms,
      workflows: updatedWorkflows,
      daysToTotalDepth: Math.max(0, well.daysToTotalDepth + daysDelta)
    };
  }

  private randomizeSeverity(current: Alarm['severity']): Alarm['severity'] {
    if (Math.random() > 0.75) {
      const severities: Alarm['severity'][] = ['low', 'medium', 'high'];
      return severities[this.randomInt(0, severities.length - 1)];
    }
    return current;
  }

  private randomizeWorkflowStatus(current: WorkflowStatus['status']): WorkflowStatus['status'] {
    if (Math.random() > 0.85) {
      const statuses: WorkflowStatus['status'][] = ['valid', 'action-needed', 'invalid'];
      const alternatives = statuses.filter(status => status !== current);
      return alternatives[this.randomInt(0, alternatives.length - 1)];
    }
    return current;
  }

  private randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  private cloneWells(wells: Well[]): Well[] {
    return wells.map(well => ({
      ...well,
      activeAlarms: well.activeAlarms.map(alarm => ({ ...alarm })),
      packoffRisk: { ...well.packoffRisk },
      workflows: well.workflows.map(workflow => ({ ...workflow }))
    }));
  }
}
