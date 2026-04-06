import type { StudyItem, StudyItemInput } from '../types/study'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'
const RESOURCE = `${BASE_URL}/studyItems`

const getErrorMessage = async (response: Response) => {
  const text = await response.text()
  if (!text) {
    return `Erro ${response.status}: ${response.statusText}`
  }

  try {
    const parsed = JSON.parse(text) as { message?: string }
    return parsed.message ?? `Erro ${response.status}: ${response.statusText}`
  } catch {
    return text
  }
}

const parseResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(await getErrorMessage(response))
  }

  return (await response.json()) as T
}

export const studyApi = {
  async list(): Promise<StudyItem[]> {
    const response = await fetch(RESOURCE)
    return parseResponse<StudyItem[]>(response)
  },

  async create(input: StudyItemInput): Promise<StudyItem> {
    const body = {
      ...input,
      createdAt: new Date().toISOString(),
    }

    const response = await fetch(RESOURCE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    return parseResponse<StudyItem>(response)
  },

  async updateStatus(id: number, status: StudyItem['status']): Promise<StudyItem> {
    const response = await fetch(`${RESOURCE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })

    return parseResponse<StudyItem>(response)
  },

  async remove(id: number): Promise<void> {
    const response = await fetch(`${RESOURCE}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(await getErrorMessage(response))
    }
  },
}
