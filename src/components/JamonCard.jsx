import React from 'react';

export default function JamonCard({blockHash, transactionHash}) {
  return (
    <div>
      <h1>{blockHash}</h1>
      <h1>{transactionHash}</h1>
    </div>
  )
}