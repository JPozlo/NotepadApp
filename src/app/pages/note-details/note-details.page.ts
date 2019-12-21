import { NoteService } from 'src/app/services/note.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Note } from 'src/app/services/note.model';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.page.html',
  styleUrls: ['./note-details.page.scss'],
})
export class NoteDetailsPage implements OnInit {
  id: string = null;

  note: Note = {
    title: '',
    details: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.noteService.getNote(this.id).subscribe(note => {
        this.note = note;
      });
    }
  }

  addNote() {
    this.noteService.addNote(this.note).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Note Added!');
    }, err => {
      this.showToast('There was a problem adding note!' + err);
    })
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Note Deleted!');
    }, err => {
      this.showToast('Error deleting note!' + err);
    });
  }

  updateNote() {
    this.noteService.updateNote(this.note).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Note Updated');
    }, err => this.showToast('Error Updating note!' + err));
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      header: 'Toast Header Note',
      message,
      duration: 2000,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Done',
          role: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
