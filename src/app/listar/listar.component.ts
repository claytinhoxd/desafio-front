import { Component } from '@angular/core';
import { ListarService } from 'src/app/services/listar.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {

  siglaList : string[] = ["S","SE","N","NE"];
  result:any[] = [];

  constructor(private listarService: ListarService) { }

  onSelect(event:any){
    console.log(event);

    this.listarService.getValor(event.value).subscribe({
      next: data => {
        this.result = data;
        console.log(data)
      },
      error: error => {
        console.log(error)
      }
  })
  }

}
