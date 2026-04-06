import type { StudyFilters as StudyFiltersType } from '../types/study'
import styles from '../App.module.css'

interface StudyFiltersProps {
  filters: StudyFiltersType
  onChange: (next: StudyFiltersType) => void
}

export const StudyFilters = ({ filters, onChange }: StudyFiltersProps) => {
  return (
    <section className={styles.panel} aria-label="Filtros">
      <h2 className={styles.sectionTitle}>Filtros</h2>

      <div className={styles.filterGrid}>
        <label className={styles.field}>
          <span>Buscar por título/matéria</span>
          <input
            type="search"
            value={filters.search}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
            placeholder="Ex: álgebra"
          />
        </label>

        <label className={styles.field}>
          <span>Status</span>
          <select
            value={filters.status}
            onChange={(event) =>
              onChange({
                ...filters,
                status: event.target.value as StudyFiltersType['status'],
              })
            }
          >
            <option value="todos">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="revisado">Revisado</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Prioridade</span>
          <select
            value={filters.priority}
            onChange={(event) =>
              onChange({
                ...filters,
                priority: event.target.value as StudyFiltersType['priority'],
              })
            }
          >
            <option value="todas">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </label>
      </div>
    </section>
  )
}
