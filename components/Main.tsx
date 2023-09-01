import React from 'react';

function Main(props: { prompt: string, onPromptChange: (value: string) => void }) {
  const handleCopy = () => {
    const textarea = document.createElement('textarea');
    textarea.textContent = props.prompt;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('プロンプトがクリップボードにコピーされました！');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onPromptChange(e.target.value);
  };

  return (
    <>
      <div className="hidden lg:block lg:w-2/3 lg:p-3">
        <h2 className='text-lg font-bold'>生成されたプロンプト：</h2>
        <textarea 
            className="mx-auto my-8 w-full h-4/5" 
            value={props.prompt} 
            onChange={handleChange}
        />
        <button className="bg-green-500 mt-px text-white px-4 py-2 rounded hover:bg-green-600 lg:block hidden w-full" onClick={handleCopy}>コピー</button>
      </div>
    </>
  );
}

export default Main;
