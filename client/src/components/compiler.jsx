// App.jsx
import React, { useState } from "react";
import Interpreter from "js-interpreter";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import AceEditor from "react-ace";

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCompile = () => {
    try {
      const myInterpreter = new Interpreter(code);
      myInterpreter.run();
      setOutput("Code executed successfully!");
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      <h1 className="text-3xl text-white font-bold mb-8">Online JavaScript Compiler</h1>

      <div className="w-3/4 mb-6">
        <AceEditor
          mode="javascript"
          theme="monokai"
          value={code}
          onChange={setCode}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          fontSize={16}
          className="rounded-lg shadow-lg"
          setOptions={{ useWorker: false }}
          width="100%"
          height="300px"
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleCompile}
      >
        Compile & Run
      </button>

      <div className="w-3/4 mt-6">
        <h2 className="text-white font-bold text-lg">Output:</h2>
        <div className="bg-gray-800 text-white p-4 rounded-lg mt-2">
          {output}
        </div>
      </div>
    </div>
  );
}

export default App;
