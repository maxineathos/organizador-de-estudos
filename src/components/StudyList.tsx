import type { StudyItem } from '../types/study'
import styles from '../App.module.css'

interface StudyListProps {
  items: StudyItem[]
  onToggle: (item: StudyItem) => Promise<void>
  onRemove: (id: number) => Promise<void>
}

const toHumanDate = (value: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
    new Date(value),
  )

export const StudyList = ({ items, onToggle, onRemove }: StudyListProps) => {
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
            <div>
              <h3>{item.title}</h3>

              <div className={styles.chipRow}>
                <span
                  className={`${styles.chip} ${
                    item.status === 'pendente' ? styles.chipStatusPending : styles.chipStatusReviewed
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
          </li>
        ))}
      </ul>
    </section>
  )
}
