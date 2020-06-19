import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
  <header>
  <header-component></header-component>
</header>
<app-worldMap></app-worldMap>
<footer>
<footer-component></footer-component>
</footer>  
`
})
export class AppComponent {

}
