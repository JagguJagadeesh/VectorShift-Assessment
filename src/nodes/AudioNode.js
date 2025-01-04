import React, { useState } from 'react';
import BaseNode from '../nodeLayout';

export const AudioInputNode = ({ id, data }) => {
  const [audioData, setAudioData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioData(URL.createObjectURL(file));
    }
  };

  return (
    <BaseNode
      id={id}
      data={data}
      type="Audio Input"
      fields={[
        { name: 'audio', label: 'Upload Audio', type: 'file' },
      ]}
      handles={{
        input: [{ position: 'Left', id: `${id}-audio-input` }],
        output: [{ position: 'Right', id: `${id}-audio-output` }],
      }}
    >
      <input type="file" onChange={handleFileChange} accept="audio/*" />
      {audioData && <audio controls src={audioData} style={{ marginTop: '10px' }} />}
    </BaseNode>
  );
};
