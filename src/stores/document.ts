import { defineStore } from 'pinia'

import { computed, ref, type Ref } from 'vue'
import type { Doc } from './types/docType'
import { createNewDoc, getAllDocs, getDocById } from '@/utils/firebasedb'
import { useUserStore } from './user'

export const useDocsStore = defineStore(
  'documents',
  () => {
    const documents: Ref<Doc[]> = ref([])

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
      const { user } = useUserStore()

      if (user.uId) {
        documents.value = await getAllDocs(user.uId)
      }
    }

    const selectDocById = async (id: string) => {
      const doc = await getDocById(id)
      document.value = doc!
    }

    return { document, createDocument, documents, getDocsByUser, selectDocById }
  },
  {
    persist: true
  }
)
