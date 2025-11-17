import "./App.css";
import "./index.css";
import DeleteConfirmation from "./components/DeleteButton.jsx";
import CreateTaskForm from "./components/CreateTaskForm.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-start">
      {/* <DeleteConfirmation /> */}
      <CreateTaskForm />
    </div>
  );
}

export default App;
