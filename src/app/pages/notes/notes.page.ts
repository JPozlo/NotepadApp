import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/services/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  private notesList: Observable<Note[]>;

  constructor(private router: Router, private noteService: NoteService) { }

  ngOnInit() {
    this.notesList = this.noteService.getNotes();
  }

  addNote() {
    this.router.navigateByUrl('/create-note');
  }

}
