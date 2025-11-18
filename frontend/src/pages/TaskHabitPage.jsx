import React from 'react'
import { Link } from 'react-router-dom'

const TaskHabitPage = () => {
  return (
    <section className="ls-page">
      <div className="ls-container">
        <h1>Task &amp; Habit Management – Iteration 1</h1>
        <p>
          Skeleton page for task &amp; habit user stories (GS10, GS12, GS14,
          MS5, MemS4, MemS5, VS1).
        </p>

        <ul>
          <li><Link to="/task/create">GS12 – Create Task/Habit</Link></li>
          <li><Link to="/task/assign">GS10 – Assign Task/Habit</Link></li>
          <li><Link to="/task/edit">GS14 – Edit Task/Habit</Link></li>
          <li><Link to="/task/approve">MS5 – Moderator Approval</Link></li>
          <li><Link to="/task/member-add">MemS4 – Member Adds Task/Habit</Link></li>
          <li><Link to="/task/member-view">MemS5 – Member Views Tasks</Link></li>
          <li><Link to="/task/viewer">VS1 – Viewer Task Status</Link></li>
        </ul>
      </div>
    </section>
  )
}

export default TaskHabitPage
