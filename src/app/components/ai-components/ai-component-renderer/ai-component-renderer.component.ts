import { Component, Input } from '@angular/core';
import { ComponentData, ComponentType } from '../../../models/ai-message.model';

@Component({
  selector: 'app-ai-component-renderer',
  templateUrl: './ai-component-renderer.component.html',
  styleUrls: ['./ai-component-renderer.component.scss']
})
export class AIComponentRendererComponent {
  @Input() componentData!: ComponentData;

  getComponentType(): ComponentType {
    return this.componentData.type;
  }

  isTable(): boolean {
    return this.componentData.type === 'table';
  }

  isList(): boolean {
    return this.componentData.type === 'list';
  }

  isChart(): boolean {
    return this.componentData.type === 'chart';
  }

  isJson(): boolean {
    return this.componentData.type === 'json';
  }
}
