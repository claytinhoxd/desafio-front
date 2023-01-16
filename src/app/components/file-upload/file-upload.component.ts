import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

interface FileUploadState{
  file:File,
  state:string
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {

  ngOnInit(): void {
  }

  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Selecione o arquivo.';
  fileInfos?: Observable<any>;

  files:FileUploadState[] = [];

  constructor(private uploadService: FileUploadService) { }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.files = [];
      for(const file of event.target.files){
        this.files.push({file: file , state : "Aguardando envio"})
      }
    } else {
      this.fileName = 'Selecione o arquivo.';
    }
  }

  upload(): void {

    for (const file of this.files) {
      let reader = new FileReader();

      reader.onload = (event) => {
        console.log(event.target?.result);
        const valor = event.target?.result as string;

        var regex = valor.replace(/(\r\n|\n|\r)/gm, "").replace(/<precoMedio>(.+?)<\/precoMedio>/gi, "");

        file.state = "Enviando arquivo.";

        this.uploadService.upload(regex).subscribe({
          next: data => {
            file.state = "Enviando com sucesso.";
          },
          error: error => {
            file.state = "Error ao enviar o arquivo.";
          }
      })
      }

      reader.readAsText(file.file);
      file.state = "Lendo arquivo.";
     }
  }
}
