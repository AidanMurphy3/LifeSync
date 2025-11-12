import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import DeleteConfirmation from './components/DeleteButton.jsx'
import NotifyUI from './components/NotifyUI.jsx'

function App() {
    return (
<div className='p-4'>
 <DeleteConfirmation />
 <br />
 <NotifyUI />
</div>

    )
}


export default App
