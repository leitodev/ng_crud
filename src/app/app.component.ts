import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerMode} from "@angular/material/sidenav";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') private drawer: MatDrawer | undefined;
  title = 'ng_crud';
  matDrawerMode: MatDrawerMode = 'over';

  constructor(private readonly router: Router) {}

  ngAfterViewInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => this.drawer?.close());
  }
}
