import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListFactoryOpts, FirebaseObjectFactoryOpts, PathReference } from 'angularfire2/interfaces';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {
  constructor(private database: AngularFireDatabase) { }

  object<T>(pathOrRef: PathReference, opts?: FirebaseObjectFactoryOpts) {
    return this.database.object(pathOrRef, opts) as Observable<T>;
  }

  list<T>(pathOrRef: PathReference, opts?: FirebaseListFactoryOpts) {
    return this.database.list(pathOrRef, opts) as Observable<T[]>;
  }

  get<T>(path: string, query?: (ref: firebase.database.Reference) => firebase.database.Query) {
    return new Observable<T>(observer => {
      const ref = this.database.database.ref(path);
      const queryOrRef = query ? query(ref) : ref;

      const onValue = (snapshot: firebase.database.DataSnapshot) => {
        const value = snapshot.val();

        if (value) {
          observer.next(value);
        }
      };

      queryOrRef.on('value', onValue, (error: any) => { observer.error(error); });

      return () => { queryOrRef.off('value', onValue); };
    });
  }

  push<T>(path: string, value: T) {
    return new Observable<void>(observer => {
      this.database.database.ref(path).push(value)
        .then(() => { observer.next(void 0); observer.complete(); })
        .catch(error => { observer.error(error); });
    });
  }

  set<T>(path: string, value: T) {
    return new Observable<void>(observer => {
      this.database.database.ref(path).set(value)
        .then(() => { observer.next(void 0); observer.complete(); })
        .catch(error => { observer.error(error); });
    });
  }

  delete(path: string) {
    return new Observable<void>(observer => {
      this.database.database.ref(path).remove()
        .then(() => { observer.next(void 0); observer.complete(); })
        .catch(error => { observer.error(error); });
    });
  }

  transaction<T>(path: string, update: (value: T) => T) {
    return new Observable<T>(observer => {
      this.database.database.ref(path).transaction(update, (error, committed, snapshot) => {
        if (committed) {
          observer.next(snapshot.val());
          observer.complete();
        } else {
          observer.error(error);
        }
      });
    });
  }
}
