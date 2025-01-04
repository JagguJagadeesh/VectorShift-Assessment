import BaseNode from '../nodeLayout';

export const ImageNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="Image"
      fields={[
        { name: 'imageUrl', label: 'Image URL', type: 'file', defaultValue: '' },
      ]}
      handles={{
        input: [{ id: `${id}-input`, style: { top: '50%' } }],
        output: [{ id: `${id}-output`, style: { top: '50%' } }],
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '200px',
        height: 'auto',
      }}
    />
  );
};
