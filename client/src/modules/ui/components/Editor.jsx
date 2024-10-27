import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKEditorComponent = ({ initialValue, onChange }) => {
  const [editorData, setEditorData] = useState(initialValue);

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    onChange(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
      onChange={handleChange}
      config={{
        toolbar: ["bold", "italic", "bulletedList", "numberedList"],
      }}
    />
  );
};

export default CKEditorComponent;
