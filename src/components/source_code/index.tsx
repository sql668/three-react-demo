
import { SourceCodeViewer } from "./code";
const SourceCode = (WrappedComponent: React.FC, code: string) => {
  return function WithSourceCode(props:any) { 
    return (
      <>
        <WrappedComponent {...props}></WrappedComponent>
        <SourceCodeViewer code={code}></SourceCodeViewer>
      </>
    );
  }
};

export default SourceCode