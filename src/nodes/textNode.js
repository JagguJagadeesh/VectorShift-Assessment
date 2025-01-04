// // textNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const TextNode = ({ id, data }) => {
//   const [currText, setCurrText] = useState(data?.text || '{{input}}');

//   const handleTextChange = (e) => {
//     setCurrText(e.target.value);
//   };

//   return (
//     <div className='nodes'>
//       <div>
//         <span>Text</span>
//       </div>
//       <div>
//         <label>
//           Text:
//           <input 
//             type="text" 
//             value={currText} 
//             onChange={handleTextChange} 
//           />
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-output`}
//       />
//     </div>
//   );
// }

import React, { useState } from 'react';
import BaseNode from '../nodeLayout';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 150, height: 50 });

  // Function to handle text input change
  const handleTextChange = (value) => {
    setCurrText(value);

    // Extract variables using regex
    const matches = [...value.matchAll(/{{\s*([\w$]+)\s*}}/g)].map((match) => match[1]);
    setVariables(matches);

    // Adjust dimensions dynamically based on text length
    const lines = value.split('\n').length;
    const maxLength = Math.max(...value.split('\n').map((line) => line.length));
    setDimensions({
      width: Math.max(150, maxLength * 8), // Adjust width dynamically
      height: Math.max(50, lines * 20),   // Adjust height dynamically
    });
  };

  return (
    <BaseNode
      id={id}
      data={{ ...data, text: currText }}
      type="Text"
      fields={[
        {
          name: 'text',
          label: 'Text',
          type: 'textarea',
          defaultValue: '{{input}}',
          onChange: handleTextChange, // Handle text change
        },
      ]}
      handles={{
        input: variables.map((variable, index) => ({
          position: 'Left',
          id: `${id}-${variable}`,
          style: { top: `${(index + 1) * 20}px` }, // Position dynamically
        })),
        output: [{ position: 'Right', id: `${id}-output` }],
      }}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
    />
  );
};
