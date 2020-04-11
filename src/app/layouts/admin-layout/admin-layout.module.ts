import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ArticleComponent } from '../../article/article.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { ArticleCreateComponent } from '../../article-create/article-create.component';
import { EventsComponent } from '../../events/events.component';
import { CreateEventsComponent } from '../../create-events/create-events.component';
import { UserArticlesComponent } from '../../user-articles/user-articles.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule
} from '@angular/material';
 import { ToastrModule } from 'ngx-toastr';
 import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import { PatheykramComponent } from 'app/patheykram/patheykram.component';
import { ArticleUpdateComponent } from 'app/article-update/article-update.component';
import { ArticleContentComponent } from 'app/article-content/article-content.component';
import { PatheykramCreateComponent } from 'app/patheykram-create/patheykram-create.component';
import { SubjectPatheykramComponent } from 'app/subject-patheykram/subject-patheykram.component';
import { PatheykramBlogsComponent } from 'app/patheykram-blogs/patheykram-blogs.component';
import { PatheykramContentComponent } from 'app/patheykram-content/patheykram-content.component';
import { PatheykramUpdateComponent } from 'app/patheykram-update/patheykram-update.component';
import { SubjectCreateComponent } from 'app/subject-create/subject-create.component';
import { ClassCreateComponent } from 'app/class-create/class-create.component';
import { DictionaryComponent } from 'app/dictionary/dictionary.component';
import { DictionaryCreateComponent } from 'app/dictionary-create/dictionary-create.component';
import {MatTableModule} from '@angular/material/table';
import { DictionaryUpdateComponent } from 'app/dictionary-update/dictionary-update.component';
import { DictionaryDetailsComponent } from 'app/dictionary-details/dictionary-details.component';
import { PatheykramWrittenTestComponent } from 'app/patheykram-written-test/patheykram-written-test.component';
import { WrittenTestQuestionComponent } from 'app/written-test-question/written-test-question.component';
import { GKWrittenTestQuestionComponent } from 'app/gk-written-test-question/gk-written-test-question.component';
import { GKWrittenTestComponent } from 'app/gk-written-test/gk-written-test.component';
import { GkTopicComponent } from 'app/gk-topic/gk-topic.component';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot() ,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FullCalendarModule,
    MatRadioModule,
    CKEditorModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ArticleContentComponent,
    SubjectCreateComponent,
    ClassCreateComponent,
    ArticleComponent,
    ArticleCreateComponent,
    EventsComponent,
    PatheykramComponent,
    ArticleUpdateComponent,
    PatheykramCreateComponent,
    CreateEventsComponent,
    UserArticlesComponent,
    SubjectPatheykramComponent,
    PatheykramBlogsComponent,
    PatheykramContentComponent,
    PatheykramUpdateComponent,
    DictionaryComponent,
    DictionaryCreateComponent,
    DictionaryUpdateComponent,
    DictionaryDetailsComponent,
    PatheykramWrittenTestComponent,
    WrittenTestQuestionComponent,
    GKWrittenTestQuestionComponent,
    GKWrittenTestComponent,
    GkTopicComponent    
  ],
  providers: [  
    MatDatepickerModule,  
  ],

})

export class AdminLayoutModule {}
