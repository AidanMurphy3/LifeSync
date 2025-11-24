import { Link } from "react-router-dom";
import Buttons from "../Buttons/Buttons";

function FriendsColumn() {
  return (
    <div className="w-[250px] sticky top-0 bg-[var(--ls-primary)] text-white p-4 border-l border-black">
      <div className="flex justify-between">
        <h2 className="text-[var(--ls-text-muted)] font-semibold mb-4">
          Friends
        </h2>
        <Link to="/friends">
          <Buttons text="+ Add Friends" variant="secondary" />
        </Link>
      </div>

      <ul className="space-y-2">
        <li className="cursor-pointer hover:text-[var(--ls-primary)]">
          Friend 1
        </li>
        <li className="cursor-pointer hover:text-[var(--ls-primary)]">
          Friend 2
        </li>
        <li className="cursor-pointer hover:text-[var(--ls-primary)]">
          Friend 3
        </li>
      </ul>
    </div>
  );
}

export default FriendsColumn;
