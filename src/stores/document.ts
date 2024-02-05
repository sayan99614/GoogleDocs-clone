import { defineStore } from 'pinia'

import { computed, ref, type Ref } from 'vue'
import type { Doc } from './types/docType'
import { createNewDoc } from '@/utils/firebasedb'

export const useUserStore = defineStore(
  'documents',
  () => {
    const document: Ref<Doc> = ref({
      uId: '',
      title: '',
      content: '',
      id: undefined
    })

    const createDocument = async (doc: Doc) => {
      const _doc = await createNewDoc(doc)

      console.log(_doc)
    }

    return { document, createDocument }
  },
  {
    persist: true
  }
)
