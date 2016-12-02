import { Component } from '@angular/core';

@Component({
    template: `
<div class="list-group">
  <a href="#" class="list-group-item disabled">
    History
  </a>
  <a class="list-group-item">Graz - Hamburg</a>
  <a class="list-group-item">Graz - Frankfurt</a>
  <a class="list-group-item">Hamburg - Graz</a>
  <a class="list-group-item">Frankfurt - Graz</a>
</div>
    `
})
export class FlightHistoryComponent {

}

