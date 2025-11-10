import { useState } from 'react';

export default function DeleteConfirmation() {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
   //Enter Backend logic here.
    console.log('Item deleted!');
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div>
        <button
          onClick={handleDelete}
          className="bg-[#F84848] hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Delete Item
        </button>


      {showModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-3 text-gray-900">Confirm Delete</h3>
            <p className="text-gray-600 mb-6 font-[inter]">
              Are you sure you want to delete "group_name"? This action cannot be undone.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-[#F84848] hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}