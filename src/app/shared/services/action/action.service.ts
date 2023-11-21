import { Injectable } from '@angular/core';
import { IActionRequest } from '../../interfaces/actions.interface';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  docData,
} from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  private actionsCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.actionsCollection = collection(this.afs, 'actions');
  }

  // ========== firebase ======//

  getAllFirebase() {
    return collectionData(this.actionsCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const actionsDocumentReference = doc(this.afs, `actions/${id}`);
    return docData(actionsDocumentReference, { idField: 'id' });
  }

  createFirebase(action: IActionRequest) {
    return addDoc(this.actionsCollection, action);
  }

  updateFirebase(action: IActionRequest, id: string) {
    const actionsDocumentReference = doc(this.afs, `actions/${id}`);
    return updateDoc(actionsDocumentReference, { ...action });
  }
  deleteFirebase(id: string) {
    const actionsDocumentReference = doc(this.afs, `actions/${id}`);
    return deleteDoc(actionsDocumentReference);
  }
}
