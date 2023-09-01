import Main from '@/components/Main'
import Sidebar from '@/components/Sidebar'
import React, { useState } from 'react'

function index() {
  const [displayedPrompt, setDisplayedPrompt] = useState('');

  return (
    <>
      <div className='lg:flex'>
        <Sidebar onGenerate={setDisplayedPrompt} />
        <Main prompt={displayedPrompt} onPromptChange={setDisplayedPrompt} />
      </div>
    </>
  )
}

export default index;
