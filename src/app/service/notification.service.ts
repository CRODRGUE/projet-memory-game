import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  readonly VAPID_PUBLIC_KEY: string = "BAY2RFjqz8sW8N6NkVeaCIqnf2Yv8LySnMiy2LZG3xpyaQs7OlDWw6R92wUVhwgxQyyLHTWue0f5Rr_mFZ97Vdc";
  readonly URL_SERVER_PUSH: string = "http://localhost:3000/subscribe/notification";

  constructor(private SwPush: SwPush,
    private http: HttpClient) { }

  requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted...');
        this.subscribeToNotifications();
      } else {
        console.log('Notification permission denied...');
      }
    });
  }

  subscribeToNotifications() {
    if (Notification.permission == 'granted') {
      this.SwPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      }).then(sub => {
        console.log(sub);
        this.askServerPush(sub)
      }).catch(err => console.warn(`Erreur service notification : impossible d'activer les notification push : ${err}`))
    } else {
      console.warn("Notification impossible : permission non autorisée");
    }
  }

  askServerPush(sub: PushSubscription) {
    this.http.post('http://localhost:3000/subscribe/notification', sub).subscribe({
      next(value) {
        console.log('ici', value);
      },
      error(err) {
        console.log('ici', err)
      },
      complete() {
        console.log('ici end')
      },
    });
  }
}
