import {Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css'],
  template:`
  <h3>Top Heroes</h3>
  <div class="grid grid-pad">
      <div *ngFor="#hero of heroes" (click)="gotoDetail(hero)" class="col-1-4" >
          <div class="module hero">
              <h4>{{hero.name}}</h4>
          </div>
      </div>
  </div>
  `
})

export class DashboardComponent implements OnInit{
    heroes: Hero[] = [];

    constructor(
        private _router: Router,
        private _heroService: HeroService){}

    ngOnInit(){
        this._heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1,5));
    }

    gotoDetail(hero: Hero){
      let link = ['HeroDetail', {id: hero.id}];
      this._router.navigate(link);
    }
}
