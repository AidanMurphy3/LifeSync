import { Link } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import RoundDashboard from "../Dashboard/Dashboard";

function Card({ id, groupName, groupType, tasks }) {
  return (
    <div
      className="bg-[var(--ls-primary)] rounded-[20px] shadow w-full  text-[var(--ls-text-muted)] flex flex-col"
      style={{ padding: "20px" }}
    >
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
            {(tasks ?? []).slice(0, 8).map((task) => {
              return <li>{task}</li>;
            })}
          </ul>
        </div>
      </div>
      <Link to={`/group-management/${id}`} className="self-end">
        <Buttons text="View Group" variant="secondary" />
      </Link>
    </div>
  );
}

export default Card;
