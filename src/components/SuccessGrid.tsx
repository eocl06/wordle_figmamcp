import React from 'react';

interface SuccessGridProps {
  word: string[];
}

export const SuccessGrid: React.FC<SuccessGridProps> = ({ word }) => {
  const wordString = word.join('');
  
  // Create grid: 5 columns, 4 rows
  const rows = [
    wordString.split(''), // First row: submitted word
    Array(5).fill(''), // Second row: empty
    Array(5).fill(''), // Third row: empty
    Array(5).fill(''), // Fourth row: empty
  ];

  const opacities = [1, 0.7, 0.5, 0.3, 0.1]; // Opacity for each row

  return (
    <div className="success-grid">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((letter, colIndex) => {
            const isFilled = rowIndex === 0 && letter !== '';
            return (
              <div
                key={colIndex}
                className={`grid-cell ${isFilled ? 'filled' : 'empty'}`}
                style={{ opacity: isFilled ? 1 : opacities[rowIndex] }}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

