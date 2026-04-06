import { useState } from 'react'
import type { StudyItem, StudyItemInput } from '../types/study'
import styles from '../App.module.css'

interface StudyListProps {
  items: StudyItem[]
  onToggle: (item: StudyItem) => Promise<void>
  onUpdate: (id: number, input: StudyItemInput) => Promise<void>
  onRemove: (id: number) => Promise<void>
}

const toHumanDate = (value: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
    new Date(value),
  )

export const StudyList = ({ items, onToggle, onUpdate, onRemove }: StudyListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [draft, setDraft] = useState<StudyItemInput | null>(null)
  const [editError, setEditError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const startEdit = (item: StudyItem) => {
    setEditingId(item.id)
    setEditError(null)
    setDraft({
      title: item.title,
      subject: item.subject,
      notes: item.notes,
      minutesSpent: item.minutesSpent,
      nextReviewDate: item.nextReviewDate,
      priority: item.priority,
      status: item.status,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraft(null)
    setEditError(null)
  }

  const saveEdit = async () => {
    if (!draft || editingId === null) {
      return
    }

    if (!draft.title.trim() || !draft.subject.trim() || !draft.nextReviewDate) {
      setEditError('Preencha título, matéria e data da próxima revisão.')
      return
    }

    setIsSaving(true)
    setEditError(null)

    try {
      await onUpdate(editingId, {
        ...draft,
        title: draft.title.trim(),
        subject: draft.subject.trim(),
        notes: draft.notes.trim(),
      })
      cancelEdit()
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'Não foi possível salvar as alterações.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!items.length) {
    return (
      <section className={styles.panel} aria-live="polite">
        <h2 className={styles.sectionTitle}>Seus estudos</h2>
        <p className={styles.emptyState}>
          Nenhum registro encontrado com os filtros atuais. Ajuste os filtros ou crie um novo item.
        </p>
      </section>
    )
  }

  return (
    <section className={styles.panel} aria-live="polite" aria-labelledby="lista-estudos">
      <h2 id="lista-estudos" className={styles.sectionTitle}>
        Seus estudos
      </h2>

      <ul className={styles.studyList}>
        {items.map((item) => (
          <li key={item.id} className={styles.studyCard}>
            {editingId === item.id && draft ? (
              <div className={styles.inlineEditGrid}>
                <label className={styles.field}>
                  <span>Título da sessão</span>
                  <input
                    type="text"
                    value={draft.title}
                    onChange={(event) =>
                      setDraft((prev) => (prev ? { ...prev, title: event.target.value } : prev))
                    }
                  />
                </label>

                <label className={styles.field}>
                  <span>Matéria</span>
                  <input
                    type="text"
                    value={draft.subject}
                    onChange={(event) =>
                      setDraft((prev) => (prev ? { ...prev, subject: event.target.value } : prev))
                    }
                  />
                </label>

                <label className={styles.field}>
                  <span>Próxima revisão</span>
                  <input
                    type="date"
                    value={draft.nextReviewDate}
                    onChange={(event) =>
                      setDraft((prev) =>
                        prev ? { ...prev, nextReviewDate: event.target.value } : prev,
                      )
                    }
                  />
                </label>

                <label className={styles.field}>
                  <span>Prioridade</span>
                  <select
                    value={draft.priority}
                    onChange={(event) =>
                      setDraft((prev) =>
                        prev
                          ? {
                              ...prev,
                              priority: event.target.value as StudyItemInput['priority'],
                            }
                          : prev,
                      )
                    }
                  >
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Status</span>
                  <select
                    value={draft.status}
                    onChange={(event) =>
                      setDraft((prev) =>
                        prev
                          ? {
                              ...prev,
                              status: event.target.value as StudyItemInput['status'],
                            }
                          : prev,
                      )
                    }
                  >
                    <option value="pendente">Pendente</option>
                    <option value="revisado">Revisado</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Tempo estudado (minutos)</span>
                  <input
                    type="number"
                    min={5}
                    step={5}
                    value={draft.minutesSpent}
                    onChange={(event) =>
                      setDraft((prev) =>
                        prev ? { ...prev, minutesSpent: Number(event.target.value) } : prev,
                      )
                    }
                  />
                </label>

                <label className={styles.fieldWide}>
                  <span>Dúvidas e observações</span>
                  <textarea
                    rows={3}
                    value={draft.notes}
                    onChange={(event) =>
                      setDraft((prev) => (prev ? { ...prev, notes: event.target.value } : prev))
                    }
                  />
                </label>

                {editError ? <p className={styles.error}>{editError}</p> : null}

                <div className={styles.cardButtonRow}>
                  <button className={styles.primaryButton} onClick={() => void saveEdit()}>
                    {isSaving ? 'Salvando...' : 'Salvar alterações'}
                  </button>
                  <button className={styles.secondaryButton} onClick={cancelEdit}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h3>{item.title}</h3>

                  <div className={styles.chipRow}>
                    <span
                      className={`${styles.chip} ${
                        item.status === 'pendente'
                          ? styles.chipStatusPending
                          : styles.chipStatusReviewed
                      }`}
                    >
                      {item.status === 'pendente' ? 'Pendente' : 'Revisado'}
                    </span>

                    <span
                      className={`${styles.chip} ${
                        item.priority === 'alta'
                          ? styles.chipPriorityHigh
                          : item.priority === 'media'
                            ? styles.chipPriorityMedium
                            : styles.chipPriorityLow
                      }`}
                    >
                      Prioridade {item.priority === 'media' ? 'média' : item.priority}
                    </span>
                  </div>

                  <p className={styles.meta}>
                    {item.subject} | {item.minutesSpent} min
                  </p>
                  <p className={styles.meta}>Próxima revisão: {toHumanDate(item.nextReviewDate)}</p>
                  {item.notes ? <p>{item.notes}</p> : null}
                </div>

                <div className={styles.actions}>
                  <button className={styles.secondaryButton} onClick={() => startEdit(item)}>
                    Editar
                  </button>
                  <button className={styles.secondaryButton} onClick={() => void onToggle(item)}>
                    {item.status === 'pendente' ? 'Marcar como revisado' : 'Voltar para pendente'}
                  </button>
                  <button
                    className={styles.dangerButton}
                    onClick={() => {
                      const confirmed = window.confirm('Deseja remover este registro de estudo?')
                      if (confirmed) {
                        void onRemove(item.id)
                      }
                    }}
                  >
                    Remover
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
