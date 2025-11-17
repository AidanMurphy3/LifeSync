import React from 'react'

export default function AddMembers() {
  const [email, setEmail] = useState('');
  const [invitedMembers, setInvitedMembers] = useState(['jane.doe@example.com', 'john.smith@example.com']);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddMember = (e) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address.");
      return;
    }

    if (invitedMembers.includes(email)) {
      setError("This email is already in the invitation list.");
      return;
    }
    
    // Add member to the list and clear input
    setInvitedMembers(prev => [...prev, email]);
    setEmail('');
  };

  const handleRemoveMember = (emailToRemove) => {
    setInvitedMembers(prev => prev.filter(email => email !== emailToRemove));
  };

  const handleSendInvitations = async () => {
    if (invitedMembers.length === 0) {
      setError("The invitation list is empty. Add members first.");
      return;
    }
    
    setIsSending(true);
    setError(null);
    
    // Simulate API call to send invitations
    console.log("Simulating sending invitations to:", invitedMembers);
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    
    setIsSending(false);
    
    // Show a message or navigate after successful mock send
    alert(`Invitations successfully sent to ${invitedMembers.length} people!`);
    navigate('/group-management');
  };

  return (
    <section className="min-h-screen bg-gray-50 flex justify-center py-12">
      <div className="w-full max-w-2xl mx-4 p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          <UserPlus className="inline-block w-6 h-6 mr-2 text-blue-600" />
          Add Members to Group: <span className="text-blue-600">Fitness Team</span>
        </h1>

        <p className="mb-6 text-gray-600">
          Enter email addresses to send invitations to join this group.
        </p>

        {error && (
          <div className="flex items-center p-3 mb-4 text-red-800 bg-red-100 border border-red-200 rounded-lg text-sm">
            <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Invitation Input Form */}
        <form onSubmit={handleAddMember} className="flex gap-2 mb-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            placeholder="Enter member email address"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition duration-150 flex items-center"
            disabled={isSending}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add
          </button>
        </form>

        {/* Invited Members List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-1">
            Invitation List ({invitedMembers.length})
          </h2>
          <ul className="space-y-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg bg-white">
            {invitedMembers.length > 0 ? (
              invitedMembers.map((memberEmail) => (
                <li 
                  key={memberEmail} 
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow-sm text-gray-800 text-sm"
                >
                  <span>{memberEmail}</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveMember(memberEmail)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-200 transition duration-150"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-center py-4">
                No members added yet.
              </li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 pt-4 border-t">
          {/* Cancel */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition duration-150"
            disabled={isSending}
          >
            Cancel
          </button>

          {/* Send Invitations */}
          <button 
            type="button" 
            onClick={handleSendInvitations}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 disabled:bg-blue-400 flex items-center justify-center"
            disabled={isSending || invitedMembers.length === 0}
          >
            {isSending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Invitations"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

