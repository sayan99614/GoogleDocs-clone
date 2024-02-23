import { firebaseApp } from '@/firebaseConfig'
import type { User } from '@/stores/types/userType'
import type { Doc as DocType } from '@/stores/types/docType'
import {
  addDoc,
  collection,
  getFirestore,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy
} from 'firebase/firestore'
const db = getFirestore(firebaseApp)

import { query, where, getDocs } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

export const getUser = async (uId: string): Promise<User | null> => {
  const q = query(collection(db, 'users'), where('uId', '==', uId))

  const snapshots = await getDocs(q)

  return snapshots.docs.length > 0 ? (snapshots.docs[0].data() as User) : null
}
export const createUser = async (user: User) => {
  const _user: User | null = await getUser(user.uId)

  if (!_user) {
    addDoc(collection(db, 'users'), user)
  }
}

export const createNewDoc = async (doc: DocType) => {
  const _newDoc = await addDoc(collection(db, 'docs'), doc)
  return _newDoc
}

export const getAllDocs = async (uId: string,order:'asc'|'desc'='asc'): Promise<DocType[]> => {
  const q = query(collection(db, 'docs'), where('uId', '==', uId), orderBy('dateModified', order))
  const snapshots = await getDocs(q)
  return snapshots.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id
    } as DocType
  })
}

export const getDocById = async (id: string): Promise<DocType | null> => {
  const _doc = await getDoc(doc(db, 'docs', id))

  return _doc.exists() ? ({ ..._doc.data(), id: _doc.id } as DocType) : null
}

export const updateDocument = async (id: string, updatedData: any) => {
  const docRef = doc(db, 'docs', id)

  const isExist: boolean = (await getDoc(docRef)).exists()

  if (isExist === false) throw new Error('Document not found')

  const result = await updateDoc(docRef, updatedData)

  return result
}

export const deleteDocument = async (id: string) => {
  const docRef = doc(db, 'docs', id)

  const isExist: boolean = (await getDoc(docRef)).exists()

  if (isExist === false) throw new Error('Document not found')

  const response = await deleteDoc(docRef)
  return response
}

export const saveFile = async (file: File, userId: string) => {
  try {
    const storage = getStorage(firebaseApp)
    const imageRef = ref(storage, `images/${userId}/` + file.name)

    const snapshot = await uploadBytes(imageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)

    return downloadURL
  } catch (error) {
    return new Error("Can't upload image at this moment")
  }
}
