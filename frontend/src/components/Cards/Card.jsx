import { Link } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import RoundDashboard from "../Dashboard/Dashboard";
import { useGroups } from "@context/GroupsContext/GroupProvider";

function Card({ id, groupName, groupType }) {
  const { tasksByGroup } = useGroups();
  const tasks = tasksByGroup[id] || [];

  console.log(tasks);

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
        <div className="flex flex-col">
          <span>Tasks/Habits</span>
          <ul>
            {tasks.length === 0 ? (
              <li className="opacity-70">No tasks yet</li>
            ) : (
              tasks.slice(0, 3).map((task) => (
                <li key={task._id} className="truncate">
                  • {task.title}
                </li>
              ))
            )}
          </ul>

          {tasks.length > 3 && (
            <span className="text-xs mt-2 opacity-70">
              + {tasks.length - 3} more…
            </span>
          )}
        </div>
      </div>
      <Link to={`/group-management/${id}`} className="self-end">
        <Buttons text="View Group" variant="secondary" />
      </Link>
    </div>
  );
}

export default Card;
