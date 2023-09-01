
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Select from 'react-select';
import { SketchPicker } from 'react-color';

// react-selectをクライアントサイドのみでレンダリング
const DynamicSelect = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});
const DynamicSketchPicker = dynamic(() => import('react-color').then(mod => mod.SketchPicker), {
  ssr: false,
  loading: () => <p>Loading color picker...</p>
});

const pickerStyles = {
  default: {
    picker: {
      width: '90%', // ここで幅を調整します
      boxShadow: 'none'
    }
  }
};


function Sidebar({ onGenerate }) {
    const [position, setPosition] = useState<string | null>(null);
    const [request, setRequest] = useState("");
    const [emotion, setEmotion] = useState(50);
    const [impact, setImpact] = useState(50);
    const [usability, setUsability] = useState(1.0);
    const [tokens, setTokens] = useState(3000);
    const [benefit, setBenefit] = useState(50);
    const [generalPrompt, setGeneralPrompt] = useState(true);
    const [text, setText] = useState('');
    const [language, setLanguage] = useState('日本語');
    const [format, setFormat] = useState('``');
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [tagline, setTagline] = useState(false);
    const [stepByStep, setStepByStep] = useState(false);
    const [ignore, setIgnore] = useState(false);
    const [colorPalette, setColorPalette] = useState(false);
    const [mainColor, setMainColor] = useState('#FFFFFF');
  const [subColor, setSubColor] = useState('#5187F0');
  const [accentColor, setAccentColor] = useState('#50F35A');
    const [theme, setTheme] = useState('');
    const [test, setTest] = useState('');
    const [target, setTarget] = useState('');
    
    const handleGenerate = () => {
      let prompt = `###前提条件：あなたはアルバート・アインシュタインのような IQ とカリスマ性を備えた${position ? position : '...'}です。`;
      prompt += `####回答依頼：${request} 。内容を理解したら“OK”と言って作成してください。`;
      prompt += `#emotion：${emotion}%、#Impact：${impact}%、#Benefit：${benefit}%、###Temperature：${usability}、###Max Tokens：${tokens}、`;
    
      if (colorPalette) {
        prompt += `##カラーパレット: [メインカラー${mainColor}, サブカラー${subColor}, アクセントカラー${accentColor}]、`;
      }
    
      if (text) prompt += `##追加条件：${text}、`;
      if (theme) prompt += `##テーマ：${theme}、`;
      if (test) prompt += `##テスト項目：${test}、`;
      if (target) prompt += `##ターゲット情報：${target}、`;
      if (generalPrompt) {
          prompt += `##以下の指示に沿って生成してください。未知の情報であるからわからないという答えではなく、知っている情報から論理的に推定してください。明確にポジションを取って、結論を言い切ってください。新規性の高い内容を述べてください。このスレッドの内容の特異性に基づいて述べてください。私があなたに何を頼んだか思い出さないでください。謝るな。自己言及しないでください。`;
      }
      if (tagline) prompt += `##Human Written | 100% Unique | Optimized、`;
      if (stepByStep) prompt += `##Let's think step by step、`;
      if (ignore) prompt += `##Please ignore all previous instructions.、`;
      prompt += `\n##使用言語：${language}、##回答フォーマット：${format}`;
      setGeneratedPrompt(prompt);
      
      setGeneratedPrompt(prompt);
      onGenerate(prompt);
  };

  const handlePromptChange = (e) => {
      setGeneratedPrompt(e.target.value);
  };
    

    const handleCopy = () => {
      const textarea = document.createElement('textarea');
      textarea.textContent = generatedPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    };


    return (
      <>
        
        <div className="flex flex-col px-6 lg:px-10 lg:border-r-2 pb-6 lg:shadow-lg lg:w-1/3 lg:overflow-y-auto lg:h-screen">
        <div className="block text-center mx-auto font-extrabold my-3">Prompt Generator for ChatGPT</div>
        <div className="grid grid-cols-1 gap-2">
        <DynamicSelect 
        options={[
          { value: 'フルスタックエンジニア', label: 'エンジニア' },
          { value: 'コピーライター', label: 'コピーライター' },
          { value: 'プランナー', label: 'プランナー' },
          { value: 'データサイエンティスト', label: 'データサイエンティスト' },
          { value: 'プロンプトジェネレーター', label: 'プロンプトジェネレーター' },
          { value: '哲学者', label: '哲学者' },
          { value: '編集者', label: '編集者' },
          { value: '脚本家', label: '脚本家' },
          { value: 'ブロガー', label: 'ブロガー' },
          { value: '評論家', label: '評論家' },
          { value: '学者', label: '学者' },
          { value: '狂人', label: '狂人' },
          { value: 'インフルエンサー', label: 'インフルエンサー' },
          { value: '教師', label: '教師' },
          { value: '科学者', label: '科学者' },
          { value: '医者', label: '医者' },
          { value: '会計士', label: '会計士' },
          { value: 'コンサルタント', label: 'コンサルタント' },
          { value: '歴史家', label: '歴史家' },
        ]}
        onChange={(selectedOption: any) => {
          setPosition(selectedOption?.value ?? '');
        }}
        
      />
      
          <textarea 
            className="p-2 border rounded mb-2" 
            onChange={e => setRequest(e.target.value)} 
            placeholder="回答依頼"
          ></textarea>
      </div>
     <label>Emotion: {emotion}%</label>
          <input type="range" min="1" max="100" value={emotion} onChange={e => setEmotion(Number(e.target.value))} />

          <label>Impact: {impact}%</label>
          <input type="range" min="1" max="100" value={impact} onChange={e => setImpact(Number(e.target.value))} />

          <label>Benefit: {benefit}%</label>
          <input type="range" min="1" max="100" value={benefit} onChange={e => setBenefit(Number(e.target.value))} />

          <label>Temperature: {usability.toFixed(1)}</label>
<input 
  type="range" 
  min="0" 
  max="2" 
  step="0.1"
  value={usability} 
  onChange={e => setUsability(parseFloat(e.target.value))} 
/>

          <label>Max Tokens: {tokens}</label>
          <input type="range" min="1" max="6000" value={tokens} onChange={e => setTokens(Number(e.target.value))} />
<div className="my-2 flex flex-col justify-start items-start">
      <label>
        <input type="checkbox" checked={generalPrompt} onChange={e => setGeneralPrompt(e.target.checked)} />
        汎用プロンプト
      </label>
      <label>
            <input type="checkbox" checked={tagline} onChange={e => setTagline(e.target.checked)} />
            Human Written | 100% Unique | Optimized tagline
          </label>
          <label>
            <input type="checkbox" checked={stepByStep} onChange={e => setStepByStep(e.target.checked)} />
            Let's think step by step
          </label>
          <label>
            <input type="checkbox" checked={ignore} onChange={e => setIgnore(e.target.checked)} />
            Please ignore all previous instructions
          </label>
          <label>
  <input type="checkbox" checked={colorPalette} onChange={e => setColorPalette(e.target.checked)} />
  Color Palette
</label>
</div>
{colorPalette && (
  <div className="flex text-2xl flex-col items-center justify-between my-4 space-x-4"> {/* space-x-4 でピッカーの間隔を増やす */}
    <div className='flex items-center flex-col justify-center  space-y-2'> {/* space-y-2 でラベルとピッカーの間隔を増やす */}
      <label>Main</label>
      <DynamicSketchPicker 
        color={mainColor} 
        onChangeComplete={color => setMainColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)} 
        disableAlpha={false} styles={pickerStyles}
      />
    </div>
    <div className="flex items-center justify-start flex-col space-y-2">
      <label>Sub</label>
      <DynamicSketchPicker 
        color={subColor} 
        onChangeComplete={color => setSubColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)} 
        disableAlpha={false} styles={pickerStyles}
      />
    </div>
    <div className='flex items-center justify-start flex-col space-y-2'>
      <label>Accent</label>
      <DynamicSketchPicker 
        color={accentColor} 
        onChangeComplete={color => setAccentColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)} 
        disableAlpha={false} styles={pickerStyles}
      />
    </div>
  </div>
)}

<div className="grid grid-cols-1 gap-3 ">
      <textarea className="p-2 border rounded"
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="追加条件" 
      ></textarea>
      <textarea 
            className="p-2 border rounded" 
            value={theme}
            onChange={(e) => setTheme(e.target.value)} 
            placeholder="テーマ"
          ></textarea>
      <textarea 
            className="p-2 border rounded" 
            value={test}
            onChange={(e) => setTest(e.target.value)} 
            placeholder="テスト項目"
          ></textarea>
      <textarea 
            className="p-2 border rounded" 
            value={target}
            onChange={(e) => setTarget(e.target.value)} 
            placeholder="ターゲット情報"
          ></textarea>
  
      <select value={language} onChange={(e) => setLanguage(e.target.value)} className='p-2 border rounded mb-2'>
        <option value="日本語">日本語</option>
        <option value="英語">英語</option>
        <option value="markdown">マークダウン</option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="Javascript">Javascript</option>
        <option value="Typescript">Typescript</option>
        <option value="Python">Python</option>
        <option value="PHP">PHP</option>
        <option value="npm">npm</option>
        <option value="yarn">yarn</option>
        <option value="pip">pip</option>
        {/* 他の言語オプションもこちらに追加 */}
      </select>
      <select value={format} onChange={(e) => setFormat(e.target.value)} className='p-2 border rounded mb-2'>
        <option value="``">コード</option>
        <option value="|記号|キャッチコピー|">キャッチコピー</option>
        <option value="|メリット|デメリット|">メリットデメリット</option>
        <option value="1.2.3.4.5.">リスト</option>
        <option value="アイデア一覧">アイデア</option>
        <option value="要約">要約</option>
        {/* 他のフォーマットオプションもこちらに追加 */}
      </select>
      </div>
      <button className="bg-blue-500 mt-4 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleGenerate}>生成</button>
          <div className="mt-8 lg:hidden">
            <h2 className="text-2xl mb-4">生成されたプロンプト:</h2>
            <textarea 
                    className="w-full p-2 border rounded mb-4 h-80"
                    value={generatedPrompt}
                    onChange={handlePromptChange}
                />
            </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 lg:hidden" onClick={handleCopy}>コピー</button>
          
        </div>
      </>
    );
}

export default Sidebar;


