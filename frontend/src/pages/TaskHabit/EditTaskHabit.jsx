// src/EditTaskHabit.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const EditTaskHabit = () => {
  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  const TASKS_ENDPOINT = `${API_BASE}/tasks`

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [selectedId, setSelectedId] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'Personal',
    status: 'Pending',
    dueDate: '',
    frequency: '',
    progress: 0,
  })

  // 6.d – fetch data from backend to update the view
  const loadTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(TASKS_ENDPOINT)
      if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.status}`)
      const data = await res.json()
      setTasks(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setError('Could not load tasks from server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  // 6.a – click "Edit" on a row
  const startEditing = (task) => {
    setSelectedId(task._id || task.id)
    setForm({
      title: task.title || '',
      description: task.description || '',
      type: task.type || 'Personal',
      status: task.status || 'Pending',
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : '',
      frequency: task.frequency || '',
      progress: task.progress ?? 0,
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'progress' ? Number(value) : value,
    }))
  }

  // 6.a – cancel editing
  const handleCancel = () => {
    setSelectedId(null)
    setForm({
      title: '',
      description: '',
      type: 'Personal',
      status: 'Pending',
      dueDate: '',
      frequency: '',
      progress: 0,
    })
  }

  // 6.a – save edited task (PUT /api/tasks/:id)
  const handleSave = async (e) => {
    e.preventDefault()
    if (!selectedId) return

    try {
      setSaving(true)
      setError('')

      const res = await fetch(`${TASKS_ENDPOINT}/${selectedId}`, {
        method: 'PUT', // match your backend
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error(`Failed to update task: ${res.status}`)

      // 6.d – refresh data after updating
      await loadTasks()
      handleCancel()
    } catch (err) {
      console.error(err)
      setError('Could not save task changes.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="ls-page">
      <div className="ls-container">
        <h1>GS14 – Edit Task/Habit</h1>
        <p className="ls-section-subtitle">
          Select a task from the list, edit its details, then use Save/Cancel.
          Updates are sent to the backend and the list refreshes automatically.
        </p>

        <p>
          <Link to="/task-habits" className="ls-btn ls-btn-small ls-btn-outline">
            ← Back to Task &amp; Habit Management
          </Link>
        </p>

        {error && <p className="ls-error">{error}</p>}

        {/* Task list */}
        <div className="ls-section" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <h2>Existing tasks / habits</h2>
          {loading ? (
            <p>Loading tasks…</p>
          ) : tasks.length === 0 ? (
            <p>No tasks found. Ask your teammate if create API (GS12) has seeded data.</p>
          ) : (
            <div className="ls-table-wrapper">
              <table className="ls-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Due date</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id || task.id}>
                      <td>{task.title}</td>
                      <td>{task.type || '—'}</td>
                      <td>
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : '—'}
                      </td>
                      <td>{task.status || 'Pending'}</td>
                      <td>{task.progress ?? 0}%</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="ls-btn ls-btn-small ls-btn-outline"
                          onClick={() => startEditing(task)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit form */}
        {selectedId && (
          <div className="ls-section">
            <h2>Edit selected task/habit</h2>
            <form className="ls-group-form" onSubmit={handleSave}>
              <div className="ls-group-form-row">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                />
              </div>

              <textarea
                name="description"
                rows={3}
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />

              <div className="ls-group-form-row">
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Approved">Approved</option>
                </select>

                <input
                  type="text"
                  name="frequency"
                  placeholder="Frequency (Daily/Weekly)"
                  value={form.frequency}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="progress"
                  min="0"
                  max="100"
                  value={form.progress}
                  onChange={handleChange}
                />
              </div>

              <div className="ls-group-form-row">
                <button
                  type="submit"
                  className="ls-btn ls-btn-small ls-btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button
                  type="button"
                  className="ls-btn ls-btn-small ls-btn-outline"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}

export default EditTaskHabit
