import { defineStore } from 'pinia'

import { ref, type Ref } from 'vue'
import type { Doc, updatedData } from './types/docType'
import { createNewDoc, getAllDocs, getDocById, updateDocument } from '@/utils/firebasedb'
import { useUserStore } from './user'

export const useDocsStore = defineStore(
  'documents',
  () => {
    const documents: Ref<Doc[]> = ref([])

    const isLoading: Ref<Boolean>= ref(false)

    const document: Ref<Doc> = ref({
      uId: '',
      title: '',
      content: '',
      id: '',
      dateModified: ''
    })

    const createDocument = async (doc: Doc) => {
      const _doc = await createNewDoc(doc)
      document.value.content = doc.content
      document.value.title = doc.title
      document.value.uId = doc.uId
      document.value.id = _doc.id
      document.value.dateModified = doc.dateModified

      return _doc.id
    }

    const getDocsByUser = async () => {
      isLoading.value = true
      const { user } = useUserStore()

      if (user.uId) {
        documents.value = await getAllDocs(user.uId)
        isLoading.value = false
      }
    }

    const selectDocById = async (id: string) => {
      const doc = await getDocById(id)
      document.value = doc!
    }

    const updateDoc = async (id: string, updatedData: updatedData) => {
      isLoading.value = true
      await updateDocument(id, updatedData)
      await selectDocById(id)
      isLoading.value = false
    }

    return { document, createDocument, documents, getDocsByUser, selectDocById, updateDoc,isLoading }
  },
  {
    persist: false
  }
)