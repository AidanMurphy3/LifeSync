import React from 'react'
import { Link } from 'react-router-dom'
import GroupDashboard from './GroupManagement/Dashboard'

const GroupManagementPage = () => {
  return (
    <section className="ls-page">
      <div className="ls-container">
        <h1>Group Management – Iteration 1</h1>
        <p>
          Skeleton page for group-related user stories (GS1, GS2, GS3, GS5,
          GS17, MemS3).
        </p>
        <GroupDashboard/>

        <ul>
          <li><Link to="/group/add-members">GS2 – Add Members</Link></li>
          <li><Link to="/group/edit">GS3 – Edit Group</Link></li>
          <li><Link to="/group/delete">GS5 – Delete Group</Link></li>
          <li><Link to="/group/assign-roles">GS17 – Assign Roles</Link></li>
          <li><Link to="/group/leave">MemS3 – Leave Group</Link></li>
        </ul>
      </div>
    </section>
  )
}

export default GroupManagementPage
