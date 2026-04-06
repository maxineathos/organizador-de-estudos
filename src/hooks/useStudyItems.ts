import { useCallback, useEffect, useState } from 'react'
import { studyApi } from '../services/studyApi'
import type { StudyItem, StudyItemInput } from '../types/study'

const sortByNewestFirst = (items: StudyItem[]) =>
  [...items].sort((left, right) => {
    const leftTime = new Date(left.createdAt).getTime()
    const rightTime = new Date(right.createdAt).getTime()

    return rightTime - leftTime
  })

export const useStudyItems = () => {
  const [items, setItems] = useState<StudyItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadItems = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await studyApi.list()
      setItems(sortByNewestFirst(data))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao carregar seus estudos.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadItems()
  }, [loadItems])

  const addItem = useCallback(async (input: StudyItemInput) => {
    const created = await studyApi.create(input)
    setItems((prev) => sortByNewestFirst([created, ...prev]))
  }, [])

  const toggleStatus = useCallback(async (item: StudyItem) => {
    const nextStatus = item.status === 'pendente' ? 'revisado' : 'pendente'
    const updated = await studyApi.updateStatus(item.id, nextStatus)
    setItems((prev) => prev.map((current) => (current.id === item.id ? updated : current)))
  }, [])

  const removeItem = useCallback(async (id: number) => {
    await studyApi.remove(id)
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateItem = useCallback(async (id: number, input: StudyItemInput) => {
    const updated = await studyApi.update(id, input)
    setItems((prev) => prev.map((item) => (item.id === id ? updated : item)))
  }, [])

  return {
    items,
    isLoading,
    error,
    loadItems,
    addItem,
    toggleStatus,
    updateItem,
    removeItem,
  }
}
