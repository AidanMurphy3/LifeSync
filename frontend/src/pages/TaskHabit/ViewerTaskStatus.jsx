import React, { useEffect, useState } from 'react'

const ViewerTaskStatus = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  const TASKS_ENDPOINT = `${API_BASE}/tasks`

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 11.c – use getTasks API to fetch all tasks/habits
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        setError('')

        const res = await fetch(TASKS_ENDPOINT)
        if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.status}`)

        const data = await res.json()
        const allTasks = Array.isArray(data) ? data : data.tasks || []
        setTasks(allTasks)
      } catch (err) {
        console.error(err)
        setError('Could not load tasks from the server.')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [TASKS_ENDPOINT])

  const formatDate = (iso) => {
    if (!iso) return '—'
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return '—'
    return d.toLocaleDateString()
  }

  const getAssigneeName = (task) => {
    if (!task) return 'Unassigned'
    if (task.assignedToName) return task.assignedToName
    if (task.assignedTo && typeof task.assignedTo === 'object') {
      return task.assignedTo.name || task.assignedTo.email || 'Unassigned'
    }
    return 'Unassigned'
  }

  const total = tasks.length
  const completed = tasks.filter((t) => t.status === 'Completed').length
  const approved = tasks.filter((t) => t.status === 'Approved').length
  const pending = tasks.filter((t) => !t.status || t.status === 'Pending').length

  return (
    <section className="ls-page">
      <div className="ls-container">
        <h1>VS1 – Viewer Task Status</h1>
        <p style={{ marginBottom: '1rem', color: '#9ca3af' }}>
          Implements user story <strong>VS1</strong> and tasks <strong>11.a</strong> / <strong>11.c</strong>:
          as a Viewer, you can see all tasks and their completion status in a read-only dashboard.
        </p>

        {/* Summary cards */}
        <section className="ls-section" style={{ paddingTop: 0 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
            }}
          >
            <div className="ls-hero-card">
              <h2>Total tasks</h2>
              {loading ? <p>…</p> : <p style={{ fontSize: '1.5rem' }}>{total}</p>}
            </div>
            <div className="ls-hero-card">
              <h2>Completed</h2>
              {loading ? <p>…</p> : <p style={{ fontSize: '1.5rem' }}>{completed}</p>}
            </div>
            <div className="ls-hero-card">
              <h2>Approved</h2>
              {loading ? <p>…</p> : <p style={{ fontSize: '1.5rem' }}>{approved}</p>}
            </div>
            <div className="ls-hero-card">
              <h2>Pending</h2>
              {loading ? <p>…</p> : <p style={{ fontSize: '1.5rem' }}>{pending}</p>}
            </div>
          </div>
        </section>

        {loading && <p>Loading tasks…</p>}
        {error && <p style={{ color: '#fca5a5' }}>{error}</p>}

        {/* Detailed list */}
        {!loading && !error && (
          <section className="ls-section">
            <h2>All tasks &amp; habits</h2>
            <div
              style={{
                borderRadius: '0.75rem',
                border: '1px solid #1f2937',
                overflow: 'hidden',
                background: '#020617',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead style={{ background: '#030712' }}>
                  <tr>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #1f2937' }}>
                      Title
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #1f2937' }}>
                      Assigned to
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #1f2937' }}>
                      Status
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #1f2937' }}>
                      Progress
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #1f2937' }}>
                      Due date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '0.75rem', textAlign: 'center', color: '#9ca3af' }}>
                        No tasks found.
                      </td>
                    </tr>
                  ) : (
                    tasks.map((task) => (
                      <tr key={task._id || task.id}>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #111827' }}>
                          {task.title}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #111827' }}>
                          {getAssigneeName(task)}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #111827' }}>
                          {task.status || 'Pending'}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #111827' }}>
                          {typeof task.progress === 'number' ? `${task.progress}%` : '—'}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #111827' }}>
                          {formatDate(task.dueDate)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </section>
  )
}

export default ViewerTaskStatus
