import { 
  CheckSquare, 
  Target, 
  X, 
  Calendar,
  Users,
  FileText,
  AlertCircle,
  Clock,
  Repeat,
  CheckCircle,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";

// API Base URL
const API_BASE_URL = "https://lifesync-ufkl.onrender.com/api";

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onConfirm, onCancel, data, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Confirm {type === 'task' ? 'Task' : 'Habit'} Creation
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Please review the details before creating
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Title:</span>
              <span className="text-gray-600">{data.title}</span>
            </div>
            {type === 'task' && (
              <>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Due Date:</span>
                  <span className="text-gray-600">{data.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Status:</span>
                  <span className="text-gray-600">{data.status}</span>
                </div>
              </>
            )}
            {type === 'habit' && (
              <>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Frequency:</span>
                  <span className="text-gray-600">{data.frequency}</span>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Confirm & Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Form Modal Component
const FormModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, icon: Icon, required, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
        {...props}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// Textarea Field Component
const TextareaField = ({ label, icon: Icon, required, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-3 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <textarea
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none`}
        rows="4"
        {...props}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// Select Field Component
const SelectField = ({ label, icon: Icon, required, error, options, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <select
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// Task Form Component
const TaskForm = ({ groupId, groupMembers, existingTasks, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    type: 'Task',
    status: 'Pending',
    groupId: groupId,
    createdBy: groupMembers[0]?.id || '', // Default to first member
    progress: 0,
    aiSuggested: false
  });
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else {
      const isDuplicate = existingTasks.some(
        task => task.title.toLowerCase().trim() === formData.title.toLowerCase().trim()
      );
      if (isDuplicate) {
        newErrors.title = 'A task with this title already exists';
      }
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!formData.assignedTo) {
      newErrors.assignedTo = 'Please assign a member';
    }
    
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const data = await response.json();
      console.log('Task created:', data);
      onSubmit(data);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Completed', label: 'Completed' }
  ];

  return (
    <>
      <div>
        <InputField
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Complete project report"
          icon={CheckSquare}
          required
          error={errors.title}
        />

        <TextareaField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide details about the task..."
          icon={FileText}
          required
          error={errors.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            icon={Calendar}
            required
            error={errors.dueDate}
          />

          <SelectField
            label="Assign To"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            icon={Users}
            required
            error={errors.assignedTo}
            options={[
              { value: '', label: 'Select a member' },
              ...groupMembers.map(m => ({ value: m.id, label: m.name }))
            ]}
          />
        </div>

        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          icon={Clock}
          options={statusOptions}
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <CheckSquare className="w-5 h-5 mr-2" />
                Create Task
              </>
            )}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirmation(false)}
        data={formData}
        type="task"
      />
    </>
  );
};

// Habit Form Component (using same task endpoint with type="Habit")
const HabitForm = ({ groupId, groupMembers, existingHabits, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    frequency: 'Daily',
    dueDate: new Date().toISOString().split('T')[0],
    type: 'Habit',
    status: 'Pending',
    groupId: groupId,
    createdBy: groupMembers[0]?.id || '',
    assignedTo: '',
    progress: 0,
    aiSuggested: false
  });
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Habit name is required';
    } else {
      const isDuplicate = existingHabits.some(
        habit => habit.title.toLowerCase().trim() === formData.title.toLowerCase().trim()
      );
      if (isDuplicate) {
        newErrors.title = 'A habit with this name already exists';
      }
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.assignedTo) {
      newErrors.assignedTo = 'Please assign a member';
    }
    
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create habit');
      }

      const data = await response.json();
      console.log('Habit created:', data);
      onSubmit(data);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error submitting habit:', error);
      alert('Failed to create habit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const frequencyOptions = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' }
  ];

  return (
    <>
      <div>
        <InputField
          label="Habit Name"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Morning Exercise"
          icon={Target}
          required
          error={errors.title}
        />

        <TextareaField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the habit and its benefits..."
          icon={FileText}
          required
          error={errors.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            icon={Repeat}
            options={frequencyOptions}
          />

          <SelectField
            label="Assign To"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            icon={Users}
            required
            error={errors.assignedTo}
            options={[
              { value: '', label: 'Select a member' },
              ...groupMembers.map(m => ({ value: m.id, label: m.name }))
            ]}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Target className="w-5 h-5 mr-2" />
                Create Habit
              </>
            )}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirmation(false)}
        data={formData}
        type="habit"
      />
    </>
  );
};

// Main Component
export default function TaskHabitForms() {
  const [activeModal, setActiveModal] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const groupId = "6915705adfeadfbc8f31ae5c"; // Replace with actual group ID

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all tasks for the group
      const tasksRes = await fetch(`${API_BASE_URL}/tasks/group/${groupId}`);
      const tasksData = await tasksRes.json();
      
      const allTasks = tasksData.data || [];
      setTasks(allTasks.filter(t => t.type === 'Task'));
      setHabits(allTasks.filter(t => t.type === 'Habit'));

      // Mock group members - replace with actual API call
      setGroupMembers([
        { id: '67113f63c30486ca69898bc1', name: 'John Doe' },
        { id: '67113f63c30486ca69898bd1', name: 'Sarah Smith' },
        { id: '67113f63c30486ca69898bd2', name: 'Mike Johnson' }
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskSubmit = (data) => {
    alert('Task created successfully!');
    setTasks([...tasks, data]);
    setActiveModal(null);
  };

  const handleHabitSubmit = (data) => {
    alert('Habit created successfully!');
    setHabits([...habits, data]);
    setActiveModal(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Create Tasks & Habits</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CheckSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Task</h2>
            <p className="text-gray-600 mb-4">
              Create and assign tasks with due dates and track progress.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Existing tasks: {tasks.length}
            </p>
            <button
              onClick={() => setActiveModal('task')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
            >
              <CheckSquare className="w-5 h-5 mr-2" />
              New Task
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Habit</h2>
            <p className="text-gray-600 mb-4">
              Build consistent habits with your group through tracking.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Existing habits: {habits.length}
            </p>
            <button
              onClick={() => setActiveModal('habit')}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
            >
              <Target className="w-5 h-5 mr-2" />
              New Habit
            </button>
          </div>
        </div>
      </div>

      <FormModal
        isOpen={activeModal === 'task'}
        onClose={() => setActiveModal(null)}
        title="Create New Task"
      >
        <TaskForm
          groupId={groupId}
          groupMembers={groupMembers}
          existingTasks={tasks}
          onSubmit={handleTaskSubmit}
          onCancel={() => setActiveModal(null)}
        />
      </FormModal>

      <FormModal
        isOpen={activeModal === 'habit'}
        onClose={() => setActiveModal(null)}
        title="Create New Habit"
      >
        <HabitForm
          groupId={groupId}
          groupMembers={groupMembers}
          existingHabits={habits}
          onSubmit={handleHabitSubmit}
          onCancel={() => setActiveModal(null)}
        />
      </FormModal>
    </div>
  );
}