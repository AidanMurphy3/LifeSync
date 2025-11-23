import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function RoundDashboard({ tasks, size = "100%" }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white shadow rounded-2xl flex flex-col items-center w-48">
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
        }}
      >
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          styles={buildStyles({
            textSize: "18px",
            pathColor: "#4f46e5",
            textColor: "#111827",
            trailColor: "#e5e7eb",
          })}
        />
      </div>

      <p className="text-sm text-gray-600">
        {completed} / {total} tasks completed
      </p>
    </div>
  );
}

export default RoundDashboard;
