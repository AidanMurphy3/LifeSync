import { Link } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import RoundDashboard from "../Dashboard/Dashboard";

function Card({ id, groupName, groupType, tasks }) {
  return (
    <div className="bg-[var(--ls-primary)] rounded-[20px] p-6 shadow w-full  text-[var(--ls-text-muted)] flex flex-col">
      <div className="flex justify-between">
        <p>{groupName}</p>
        <p>Type: {groupType}</p>
      </div>
      <div className="grid grid-cols-[2fr_1fr]">
        {/* dashboards */}
        <RoundDashboard tasks={tasks ?? []} />

        {/* tasks/habits */}
        <div>
          <span>Tasks/Habits</span>
          <ul>
            {(tasks ?? []).slice(0, 8).map((task, id) => {
              return <li key={id}>{task}</li>;
            })}
          </ul>
        </div>
      </div>
      <Link to="/api/groups" className="self-end">
        <Buttons text="View Group" variant="secondary" />
      </Link>
    </div>
  );
}

export default Card;
