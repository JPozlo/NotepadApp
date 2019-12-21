import { ToastController } from '@ionic/angular';
import { NoteService } from 'src/app/services/note.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/services/note.model';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.page.html',
  styleUrls: ['./create-note.page.scss'],
})
export class CreateNotePage implements OnInit {
  note: Note = {
    title: '',
    details: ''
  }

  constructor(private router: Router, private noteService: NoteService, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  addNote() {
    this.noteService.addNote(this.note).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Note Added!');
    }, err => {
      this.showToast('There was a problem adding note!' + err);
    })
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
