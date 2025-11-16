import React, { useEffect, useState } from 'react'

const ViewMemberTasks = () => {
  // Uses Vite env if set, otherwise defaults to local backend
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  const TASKS_ENDPOINT = `${API_BASE}/tasks`

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [memberId, setMemberId] = useState('')

  // Optional: read memberId from URL (?memberId=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const fromQuery = params.get('memberId') || params.get('userId')
      if (fromQuery) setMemberId(fromQuery)
    } catch {
      // ignore if window not available
    }
  }, [])

  // 11.c – fetch data from getTasks API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        setError('')

        const res = await fetch(TASKS_ENDPOINT)
        if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.status}`)

        const data = await res.json()
        // API may return an array directly or { tasks: [...] }
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

  // Helpers for assignedTo
  const getAssigneeId = (task) => {
    if (!task) return null
    if (typeof task.assignedTo === 'string') return task.assignedTo
    if (task.assignedTo && typeof task.assignedTo === 'object') {
      return task.assignedTo._id || task.assignedTo.id || null
    }
    return null
  }

  const getAssigneeName = (task) => {
    if (!task) return 'Unassigned'
    if (task.assignedToName) return task.assignedToName
    if (task.assignedTo && typeof task.assignedTo === 'object') {
      return task.assignedTo.name || task.assignedTo.email || 'Unassigned'
    }
    return 'Unassigned'
  }

  const formatDate = (iso) => {
    if (!iso) return '—'
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return '—'
    return d.toLocaleDateString()
  }

  // If memberId is set, only show tasks assigned to that member
  const visibleTasks = memberId
    ? tasks.filter((t) => getAssigneeId(t) === memberId)
    : tasks

  const total = visibleTasks.length
  const completed = visibleTasks.filter(
    (t) => t.status === 'Completed' || t.status === 'Approved'
  ).length

  return (
    <section className="ls-page">
      <div className="ls-container">
        <h1>MemS5 – View My Tasks/Habits</h1>
        <p style={{ marginBottom: '1rem', color: '#9ca3af' }}>
          Implements user story <strong>MemS5</strong> and tasks <strong>11.a</strong> &amp; <strong>11.c</strong>:
          a member can see all tasks/habits assigned to them using the <code>getTasks</code> API.
        </p>

        {/* Filter */}
        <section className="ls-section" style={{ paddingTop: 0 }}>
          <h2>Filter by member</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 420 }}>
            <input
              type="text"
              placeholder="Your member _id (demo) – leave empty to show all tasks"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #374151',
                background: '#020617',
                color: '#e5e7eb',
              }}
            />
            <small style={{ color: '#9ca3af' }}>
              In a real app this would come from the logged-in user. For the assignment, paste a user&apos;s MongoDB
              <code> _id</code> or leave it blank to view all tasks.
            </small>
          </div>
        </section>

        {/* Summary card */}
        <section className="ls-section">
          <div className="ls-hero-card" style={{ maxWidth: 480 }}>
            <h2>Summary</h2>
            {loading ? (
              <p>Loading tasks…</p>
            ) : error ? (
              <p style={{ color: '#fca5a5' }}>{error}</p>
            ) : (
              <ul className="ls-stats">
                <li>
                  <span>Tasks in view</span>
                  <span>{total}</span>
                </li>
                <li>
                  <span>Completed / approved</span>
                  <span>{completed}</span>
                </li>
              </ul>
            )}
          </div>
        </section>

        {/* Table */}
        <section className="ls-section">
          <h2>Tasks &amp; habits list</h2>

          {loading && <p>Loading tasks…</p>}
          {error && <p style={{ color: '#fca5a5' }}>{error}</p>}

          {!loading && !error && (
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
                      Description
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #1f2937' }}>
                      Assigned to
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #1f2937' }}>
                      Status
                    </th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #1f2937' }}>
                      Due date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTasks.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '0.75rem', textAlign: 'center', color: '#9ca3af' }}>
                        No tasks found for this member.
                      </td>
                    </tr>
                  ) : (
                    visibleTasks.map((task) => (
                      <tr key={task._id || task.id}>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #111827' }}>
                          {task.title}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #111827' }}>
                          {task.description || '—'}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #111827' }}>
                          {getAssigneeName(task)}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #111827' }}>
                          {task.status || 'Pending'}
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
          )}
        </section>
      </div>
    </section>
  )
}

export default ViewMemberTasks
