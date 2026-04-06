import { useState, type FormEvent } from 'react'
import type { StudyItemInput, StudyPriority } from '../types/study'
import styles from '../App.module.css'

interface StudyFormProps {
  onSubmit: (input: StudyItemInput) => Promise<void>
}

const initialState: StudyItemInput = {
  title: '',
  subject: '',
  notes: '',
  minutesSpent: 30,
  nextReviewDate: '',
  priority: 'media',
  status: 'pendente',
}

export const StudyForm = ({ onSubmit }: StudyFormProps) => {
  const [form, setForm] = useState<StudyItemInput>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handlePriority = (value: string): StudyPriority => {
    if (value === 'alta' || value === 'media' || value === 'baixa') {
      return value
    }

    return 'media'
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    if (!form.title.trim() || !form.subject.trim() || !form.nextReviewDate) {
      setFormError('Preencha título, matéria e data da próxima revisão.')
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        subject: form.subject.trim(),
        notes: form.notes.trim(),
      })
      setForm(initialState)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível salvar agora.'
      setFormError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={styles.panel} aria-labelledby="novo-registro">
      <h2 id="novo-registro" className={styles.sectionTitle}>
        Novo registro de estudo
      </h2>

      <form className={styles.formGrid} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>Título da sessão</span>
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            type="text"
            placeholder="Ex: Revisão de Equações"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Matéria</span>
          <input
            value={form.subject}
            onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
            type="text"
            placeholder="Ex: Matemática"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Próxima revisão</span>
          <input
            value={form.nextReviewDate}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                nextReviewDate: event.target.value,
              }))
            }
            type="date"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Prioridade</span>
          <select
            value={form.priority}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                priority: handlePriority(event.target.value),
              }))
            }
          >
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Tempo estudado (minutos)</span>
          <input
            value={form.minutesSpent}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                minutesSpent: Number(event.target.value),
              }))
            }
            type="number"
            min={5}
            step={5}
            required
          />
        </label>

        <label className={styles.fieldWide}>
          <span>Dúvidas e observações</span>
          <textarea
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            placeholder="Pontos que ainda ficaram difíceis, tópicos para revisar, etc."
            rows={4}
          />
        </label>

        {formError ? <p className={styles.error}>{formError}</p> : null}

        <button className={styles.primaryButton} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Registrar estudo'}
        </button>
      </form>
    </section>
  )
}
