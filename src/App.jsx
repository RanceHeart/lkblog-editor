import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from './ckeditor.jsx';

const App = () => {
  const handleEditorReady = (editor) => {
    console.log('Editor is ready to use!', editor);
  };

  return (
    <div className="App">
      <h2>Using the CKEditor 5 feature in React</h2>
      <CKEditor
        editor={ ClassicEditor }
        data="<p>Hello from the first editor working with the context!</p>"
        onReady={ editor => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor2 is ready to use!', editor );
        } }
      />
    </div>
  );
}

export default App;
