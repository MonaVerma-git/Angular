import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-dictionary-details',
  templateUrl: './dictionary-details.component.html',
  styleUrls: ['./dictionary-details.component.scss']
})
export class DictionaryDetailsComponent implements OnInit {
  word : any ;
  id : any ;
  public Editor = DecoupledEditor;
  constructor(private coreService : CoreService, 
    private toastrService: ToastrService,
    private activatedRoute : ActivatedRoute) {
   }
  ngOnInit() {
    this.id =  this.activatedRoute.snapshot.paramMap.get('id');
    this.getWord();
  }



  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement(),
      editor.isReadOnly = true
    );
  }

  config = {
    mediaEmbed: {
      previewsInData: true
    },
    removePlugins: 'toolbar'
  }


  getWord(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('dictionary/get_word/'+this.id).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.word = data.message;        
      } else {
        console.log(!data.message)
      }
    });
  }

}
