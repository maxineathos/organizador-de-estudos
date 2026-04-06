export type StudyStatus = 'pendente' | 'revisado'

export type StudyPriority = 'alta' | 'media' | 'baixa'

export interface StudyItem {
  id: number
  title: string
  subject: string
  notes: string
  minutesSpent: number
  nextReviewDate: string
  priority: StudyPriority
  status: StudyStatus
  createdAt: string
}

export type StudyItemInput = Omit<StudyItem, 'id' | 'createdAt'>

export interface StudyFilters {
  search: string
  status: 'todos' | StudyStatus
  priority: 'todas' | StudyPriority
}
