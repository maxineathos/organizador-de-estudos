import { useMemo, useState } from 'react'
import { StudyFilters } from './components/StudyFilters'
import { StudyForm } from './components/StudyForm'
import { StudyList } from './components/StudyList'
import { useStudyItems } from './hooks/useStudyItems'
import type { StudyFilters as StudyFiltersType } from './types/study'
import styles from './App.module.css'

const initialFilters: StudyFiltersType = {
  search: '',
  status: 'todos',
  priority: 'todas',
}

function App() {
  const { items, isLoading, error, addItem, toggleStatus, removeItem, loadItems } = useStudyItems()
  const [filters, setFilters] = useState<StudyFiltersType>(initialFilters)

  const filteredItems = useMemo(() => {
    const normalized = filters.search.toLowerCase().trim()

    return items.filter((item) => {
      const bySearch =
        !normalized ||
        item.title.toLowerCase().includes(normalized) ||
        item.subject.toLowerCase().includes(normalized)

      const byStatus = filters.status === 'todos' || item.status === filters.status
      const byPriority = filters.priority === 'todas' || item.priority === filters.priority

      return bySearch && byStatus && byPriority
    })
  }, [items, filters])

  const stats = useMemo(() => {
    const reviewed = items.filter((item) => item.status === 'revisado').length
    const pending = items.length - reviewed
    const minutes = items.reduce((acc, item) => acc + item.minutesSpent, 0)

    return { total: items.length, reviewed, pending, minutes }
  }, [items])

  return (
    <main className={styles.app}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.heroTag}>Plano inteligente de revisão</p>
          <h1>Organizador de Estudos</h1>
          <p>
            Registre sessões, priorize revisões e acompanhe o que já foi consolidado sem planilhas.
          </p>
        </header>

        <section className={styles.statsGrid} aria-label="Resumo">
          <article className={styles.statCard}>
            <span>Total de registros</span>
            <strong>{stats.total}</strong>
          </article>
          <article className={styles.statCard}>
            <span>Revisados</span>
            <strong>{stats.reviewed}</strong>
          </article>
          <article className={styles.statCard}>
            <span>Pendentes</span>
            <strong>{stats.pending}</strong>
          </article>
          <article className={styles.statCard}>
            <span>Minutos acumulados</span>
            <strong>{stats.minutes}</strong>
          </article>
        </section>

        {error ? (
          <p className={styles.apiError} role="alert">
            Não foi possível conectar com a API: {error}. Verifique se o json-server está rodando.
          </p>
        ) : null}

        <div className={styles.layout}>
          <StudyForm onSubmit={addItem} />
          <StudyFilters filters={filters} onChange={setFilters} />
        </div>

        {isLoading ? (
          <section className={styles.panel} aria-live="polite">
            <h2 className={styles.sectionTitle}>Carregando dados...</h2>
            <p>Buscando seus registros de estudo na API.</p>
          </section>
        ) : (
          <StudyList items={filteredItems} onToggle={toggleStatus} onRemove={removeItem} />
        )}

        <div className={styles.actionsBar}>
          <button className={styles.secondaryButton} onClick={() => void loadItems()}>
            Atualizar lista
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
