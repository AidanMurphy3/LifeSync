function Card() {
  return (
    <div className="ls-hero-card">
      <h2>Today at a glance</h2>
      <ul className="ls-stats">
        <li>
          <span className="ls-stat-label">Active groups</span>
          <span className="ls-stat-value">{groups.length}</span>
        </li>
        <li>
          <span className="ls-stat-label">Tasks (total)</span>
          <span className="ls-stat-value">
            {groups.reduce((sum, g) => sum + g.tasks, 0)}
          </span>
        </li>
        <li>
          <span className="ls-stat-label">Avg. completion</span>
          <span className="ls-stat-value">
            {groups.length
              ? Math.round(
                  groups.reduce((sum, g) => sum + g.completion, 0) /
                    groups.length
                )
              : 0}
            %
          </span>
        </li>
      </ul>
      <p className="ls-small">
        These values update in real time based on the groups below.
      </p>
    </div>
  );
}

export default Card;
