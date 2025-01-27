import { create } from "zustand";
import { enableMapSet } from 'immer'
import { immer } from 'zustand/middleware/immer'

export type Upload = {
  name: string
  file: File
}

type UploadState = {
  uploads: Map<string, Upload>
  addUploads: (files: File[]) => void
}

enableMapSet()

export const useUploads = create<UploadState, [['zustand/immer', never]]>(immer((set, get) => {

  function addUploads(files: File[]) {
    for (const file of files) {
      const uploadId = crypto.randomUUID()

      const upload: Upload = {
        name: file.name,
        file
      }

      set(state => {
        state.uploads.set(uploadId, upload)
      })
    }
  }

  return {
    uploads: new Map(),
    addUploads
  }
}))