import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './note.model';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notesList: Observable<Note[]>;
  private note: Observable<Note>;
  private noteCollection: AngularFirestoreCollection<Note>;

  constructor(private afStore: AngularFirestore) {
    this.noteCollection = this.afStore.collection<Note>('notes');
    this.notesList = this.noteCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data;
          const title = a.payload.doc.data().title;
          const details = a.payload.doc.data().details;
          const id = a.payload.doc.id;
          return { id, title, details, ...data };
        });
      }));
  }

  getNotes(): Observable<Note[]> {
    return this.notesList;

  }

  getNote(id: string): Observable<Note> {
    return this.noteCollection.doc<Note>(id).valueChanges().pipe(
      take(1),
      map(note => {
        note.id = id;
        return note;
      })
    );
  }

  addNote(note: Note): Promise<DocumentReference> {
    return this.noteCollection.add(note);
  }

  updateNote(note: Note): Promise<void> {
    return this.noteCollection.doc(note.id).update({ title: note.title, details: note.details });
  }

  deleteNote(id: string): Promise<void> {
    return this.noteCollection.doc(id).delete();
  }
}
