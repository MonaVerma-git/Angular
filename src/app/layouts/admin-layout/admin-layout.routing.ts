import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ArticleComponent } from 'app/article/article.component';
import { ArticleCreateComponent } from '../../article-create/article-create.component';
import { EventsComponent } from '../../events/events.component';
import { ArticleContentComponent } from 'app/article-content/article-content.component';
import { CreateEventsComponent } from '../../create-events/create-events.component';
import { ArticleUpdateComponent } from 'app/article-update/article-update.component';
import { PatheykramComponent } from 'app/patheykram/patheykram.component';
import { PatheykramCreateComponent } from 'app/patheykram-create/patheykram-create.component';
import { SubjectPatheykramComponent } from 'app/subject-patheykram/subject-patheykram.component';
import { PatheykramBlogsComponent } from 'app/patheykram-blogs/patheykram-blogs.component';
import { PatheykramContentComponent } from 'app/patheykram-content/patheykram-content.component';
import { PatheykramUpdateComponent } from 'app/patheykram-update/patheykram-update.component';
import { Component } from '@fullcalendar/core';
import { SubjectCreateComponent } from 'app/subject-create/subject-create.component';
import { ClassCreateComponent } from 'app/class-create/class-create.component';
import { DictionaryComponent } from 'app/dictionary/dictionary.component';
import { DictionaryCreateComponent } from 'app/dictionary-create/dictionary-create.component';
import { DictionaryUpdateComponent } from 'app/dictionary-update/dictionary-update.component';
import { DictionaryDetailsComponent } from 'app/dictionary-details/dictionary-details.component';
import { PatheykramWrittenTestComponent } from 'app/patheykram-written-test/patheykram-written-test.component';
import { WrittenTestQuestionComponent } from 'app/written-test-question/written-test-question.component';
import { GKWrittenTestQuestionComponent } from 'app/gk-written-test-question/gk-written-test-question.component';
import { GKWrittenTestComponent } from 'app/gk-written-test/gk-written-test.component';
import { GkTopicComponent } from 'app/gk-topic/gk-topic.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'events',          component: EventsComponent },
    { path: 'create-events',   component: CreateEventsComponent },
    { path: 'article',         component: ArticleComponent },
    { path: 'article-create', component: ArticleCreateComponent},
    { path: 'user-profile',   component: UserProfileComponent },
    { path  :'article/:id',   component: ArticleContentComponent},
    { path  :'article/edit/:id',   component: ArticleUpdateComponent},
    { path : 'patheykram' ,   component: PatheykramComponent},
    { path : 'patheykram/patheykram-create' ,  component : PatheykramCreateComponent},
    { path : 'patheykram/patheykram-blogs/:id' ,component : PatheykramContentComponent},  
    { path : 'patheykram/patheykram-blogs/update/:id' ,component : PatheykramUpdateComponent},
    { path : 'patheykram/create-subject/:id' , component : SubjectCreateComponent},
    { path : 'patheykram/written-test/:id',component : PatheykramWrittenTestComponent},
    { path : 'patheykram/written-test-question/:id' , component : WrittenTestQuestionComponent},
    { path : 'patheykram/create-class' , component:ClassCreateComponent},
    { path : 'patheykram/:subjectId/:classId'  ,component: PatheykramBlogsComponent},
    { path : 'patheykram/:id' , component : SubjectPatheykramComponent},    
    { path : 'dictionary' , component : DictionaryComponent},
    { path : 'dictionary/create', component : DictionaryCreateComponent},
    { path : 'dictionary/update/:id' , component:DictionaryUpdateComponent},
    { path : 'dictionary/:id',component:DictionaryDetailsComponent},
    // { path : 'written-test-question/:id' , component : WrittenTestQuestionComponent},
    { path : 'gk-written-test-question/:id',component : GKWrittenTestQuestionComponent},
    { path : 'gk-written-test/:id' , component:GKWrittenTestComponent},
    { path : 'gk-written-test' ,component : GkTopicComponent}
];
