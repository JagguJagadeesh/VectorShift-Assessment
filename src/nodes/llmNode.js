// // llmNode.js

// import { Handle, Position } from 'reactflow';

// export const LLMNode = ({ id, data }) => {

//   return (
//     <div className='nodes'>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-system`}
//         style={{top: `${100/3}%`}}
//       />
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-prompt`}
//         style={{top: `${200/3}%`}}
//       />
//       <div>
//         <span>LLM</span>
//       </div>
//       <div>
//         <span>This is a LLM.</span>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-response`}
//       />
//     </div>
//   );
// }

import BaseNode from '../nodeLayout';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="LLM "
      fields={[]}
      handles={{
        input: [
          { position: 'Left', id: `${id}-system`, style: { top: `${100 / 3}%` } },
          { position: 'Left', id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
        ],
        output: [{ position: 'Right', id: `${id}-response` }],
      }}
    />
  );
};
