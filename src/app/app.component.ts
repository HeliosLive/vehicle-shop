import { Component, OnInit } from '@angular/core';

import { Subject, combineLatest, takeUntil } from 'rxjs';

import { ThemeService } from '@shared/services/theme.service';
import * as WindowEvent from '@shared/helpers/window-event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.listenViewport();
    this.listenTheme();
  }

  private listenViewport(): void {
    combineLatest([WindowEvent.height(), WindowEvent.width()])
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private listenTheme(): void {
    this.themeService.initialize();
    this.themeService.listen();
  }
}
