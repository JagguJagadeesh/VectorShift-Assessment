// // submit.js

// export const SubmitButton = () => {

//     return (
//         <div style={{display: 'flex', marginTop:'10px', alignItems: 'center', justifyContent: 'center'}}>
//             <button type="submit" style={{padding: '6px',}}>Submit</button>
//         </div>
//     );
// }

import React, { useState } from "react";
import { Button,Text,AlertDialog, Grid } from "@radix-ui/themes";

const Submit = ({ nodes, edges }) => {
  const [result,setResult] = useState({
    num_nodes:null,
    num_edges:null,
    is_dag:false
  })
  const handleSubmit = async () => {
    try {
      // Prepare data
      const pipeline = {
        nodes: nodes.map((node) => ({ id: node.id, type: node.type })),
        edges: edges.map((edge) => ({ source: edge.source, target: edge.target })),
      };

      // Send request to backend
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pipeline),
      });

      // Handle response
      if (!response.ok) {
        throw new Error("Failed to parse pipeline");
      }

      const result = await response.json();
      setResult(result)

      // Display alert
      // alert(
      //   `Pipeline Analysis:\n` +
      //   `Number of Nodes: ${result.num_nodes}\n` +
      //   `Number of Edges: ${result.num_edges}\n` +
      //   `Is Directed Acyclic Graph (DAG): ${result.is_dag ? "Yes" : "No"}`
      // );
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert("An error occurred while submitting the pipeline. Please try again.");
    }
  };

  return (
    <div style={{textAlign:'center',marginTop:'16px'}}>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
        <Button onClick={handleSubmit} color="gray" variant="solid" highContrast>
			Submit
		  </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content size="4">
            
            <AlertDialog.Title>Pipeline Analysis</AlertDialog.Title>
          <Grid  align='center' width="100%" i gap='3' height="auto">
            <Text as="p" trim="both" size="4">Number of Nodes:  {result.num_nodes}</Text>
            <Text as="p" trim="both" size="4">Number of Edges: {result.num_edges}</Text>
            <Text as="p" trim="both" size="4">Is Directed Acyclic Graph (DAG): {result.is_dag ? "Yes" : "No"}</Text>
          </Grid>
        </AlertDialog.Content>
      </AlertDialog.Root>

    </div>
  );
};

export default Submit;
