import { Link } from "react-router-dom";

function Card() {
  return (
    <div className="bg-[var(--ls-primary)] rounded-[20px] p-6 shadow w-full h-[400px] text-[var(--ls-text-muted)] flex flex-col">
      <span>Group 1</span>
      <div className="grid grid-cols-[2fr_1fr] gap-4">
        {/* dashboards */}
        <div>Dashboard</div>
        {/* tasks/habits */}
        <div>
          <span>Tasks/Habits</span>
          <ul>
            <li>task 1</li>
            <li>task 2</li>
            <li>task 3</li>
          </ul>
        </div>
      </div>
      <Link to="/group/create" className="mt-auto self-end">
        <button className="ls-btn ls-btn-primary">View Group</button>
      </Link>
    </div>
  );
}

export default Card;
