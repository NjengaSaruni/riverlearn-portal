import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl:  './heroes.component.html',
  styleUrls:  ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit {
  title = 'The baddest';
  errorMessage: string;
  token: string;
  selectedHero: Hero;
  heroes: any[];
  mode = 'Observable';

  constructor(
    private heroService: HeroService,
    private router: Router) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail(): void {
      this.router.navigate(['/heroes', this.selectedHero.id]);
    }
  }



