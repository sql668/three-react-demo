import { Button } from 'antd'
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.min.css'; // 你可以选择其他样式
import { useEffect, useState } from 'react';
export const SourceCodeViewer = ({ code, language = "tsx" }: {code:string,language?:string}) => {
  const [highlightedCode, setHighlightedCode] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    const result = hljs.highlight(code, { language });
    setHighlightedCode(result.value);
  }, [code, language]);

  return (
    <div style={{borderLeft: '1px solid #ccc',borderRight:'1px solid #ccc',borderBottom:'1px solid #ccc',marginTop:'8px'}}>
      <div style={{padding: '4px 8px',borderTop:'1px dashed #ccc',borderBottom:'1px dashed #ccc'}}>
        <Button type="primary" onClick={() => { setShow(!show)}}>查看源码</Button>
      </div>

      { 
        show ? (<pre style={{backgroundColor:'rgb(20,20,20)',color:'#8590a0',padding:'10px 10px 26px 10px'}}>
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>) : null
      }
      
    </div>
  );
};