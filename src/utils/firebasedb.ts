import { firebaseApp } from '@/firebaseConfig'
import type { User } from '@/stores/types/userType'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
const db = getFirestore(firebaseApp)

import { query, where, getDocs } from 'firebase/firestore'

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
