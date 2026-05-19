function Confirmation({ isOpen, title, message, onConfirm, onCancel, confirmText, confirmColor }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-40">
      <div className="bg-white rounded-2xl shadow-2xl 2-fll max-2-sm p-6 text-center">

          <h2 className="text-lg font-bold text-gray-800 mb-2">
            {title}
            </h2>

            <p className="text-gray-600 mb-6">
              {message}
              </p> 

              <div className="flex gap-3">
                <button
                onClick={onCancel}
                className="bg-gray-100 flex-1 py-2 hover:bg-gray-200 text-gray-600 rounded-lg text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                onClick={onConfirm}
                className={`flex-1 py-2 text-white rounded-lg text-sm font-semibold transition ${
                  confirmColor === 'red' 
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
                >
                  {confirmText || 'Confirm'}
                </button>
              </div>
      </div>
    </div>
  );
}

export default Confirmation;