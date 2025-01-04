import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';



const NodeLayout = ({ 
  id, 
  data, 
  type, 
  fields = [], 
  handles = { input: [], output: [] }, 
  style 
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const [state, setState] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field.name] = data?.[field.name] || field.defaultValue;
      return acc;
    }, {})
  );

  const handleFieldChange = (fieldName, value) => {
    setState((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    setDialogOpen(false);
    setDialogOpen(true)
  };

  // console.log('Node Layout State:', state);
  const openDialog = (fieldName) => {
    setCurrentField(fieldName);
    setDialogOpen(true);
  };

  return (
    <div className="nodes" style={style}>
      <div>
        <span>{type}</span>
      </div>
      <div>
        {fields.map((field) => (
          <label key={field.name}>
            {field.label}:
            {field.type === 'text' ? (
              <input
                type={field.type}
                value={state[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
              />
            ) : field.type === 'select' ? (
              <select
                value={state[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <>
                <button onClick={() => openDialog(field.name)}>Write Text</button>
                {state[field.name] && (
                  <textarea type="text" style={{marginTop:'6px' ,fontSize:'20px', width:'100%'}} value={state[field.name].slice(0, 20)+'...'} />
                )}
              </>
            ): field.type === 'file' ? (
              <input
                type="file"
                value={state[field.name]}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                style={{ height: '40px' }}
              />
            ) : null}
          </label>
        ))}
      </div>
      
      {/* Image rendering (if type is Image) */}
      {type === 'Image' && state.imageUrl && (
        <div>
          <img src={state.imageUrl} alt="Node" style={{ maxWidth: '100%', maxHeight: '150px' }} />
        </div>
      )}

      {handles.input.map((handle, index) => (
        <Handle
          key={`in-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id || `${id}-in-${index}`}
          style={handle.style}
        />
      ))}
      {handles.output.map((handle, index) => (
        <Handle
          key={`out-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id || `${id}-out-${index}`}
          style={handle.style}
        />
      ))}
      {dialogOpen && (
        <div style={styles.dialogOverlay}>
          <div style={styles.dialogBox}>
            <h4>Enter Text</h4>
            <textarea
              value={state[currentField] || ''}
              onChange={(e) => handleFieldChange(currentField, e.target.value)}
              style={styles.textarea}
            />
            <button onClick={() => setDialogOpen(false)} style={styles.button}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  dialogOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  dialogBox: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center',
  },
  textarea: {
    width: '100%',
    height: '100px',
    margin: '10px 0',
  },
  button: {
    padding: '10px 15px',
    background: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
export default NodeLayout;

