import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import DeleteConfirmation from './components/DeleteButton.jsx'
import NotifyUI from './components/NotifyUI.jsx'
import LeaveConfirmation from './components/LeaveButton.jsx'

function App() {
    return (
<div className='p-4'>
 <DeleteConfirmation />
 <NotifyUI />
 <LeaveConfirmation />
</div>

    )
}


export default App
