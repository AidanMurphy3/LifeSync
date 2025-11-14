import React from 'react'
function getFormattedDate(date) {
  const options = { month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}
const currentDate = new Date();
const NotifyUI = () => {
  return (
    <div className="p-4 mt-4 bg-gray-300 rounded-md w-fit flex justify-center gap-2 shadow-md flex-col">
      <h2 className='text-2xl font-medium'>LifeSync Notification</h2>
      <p>
        <span   className='font-medium'>GroupLeader</span> has removed <span  className='font-medium'>memberName</span> from the group <span className='font-medium'>groupName</span>. <br />
        Reason: <span className='font-medium italic'>"Reason_For_Removal"</span>
      </p>
     <span className='text-sm text-gray-600'>
        {getFormattedDate(currentDate)}, {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
     </span>
    </div>
  )
}

export default NotifyUI

