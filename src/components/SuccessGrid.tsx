import React from 'react';

interface SuccessGridProps {
  word: string[];
}

export const SuccessGrid: React.FC<SuccessGridProps> = ({ word }) => {
  const wordString = word.join('');
  
  // Create grid: 5 columns, 5 rows (total 25 boxes)
  // First row: submitted word (green, opacity 1)
  // Rows 2-5: empty boxes with decreasing opacity
  const totalBoxes = 25;
  const boxes: Array<{ letter: string; isFilled: boolean; opacity: number }> = [];
  
  // First row: word letters (5 boxes)
  wordString.split('').forEach(letter => {
    boxes.push({ letter, isFilled: true, opacity: 1 });
  });
  
  // Remaining rows: empty boxes with opacity
  const opacities = [0.7, 0.5, 0.3, 0.1]; // For rows 2, 3, 4, 5
  for (let i = 5; i < totalBoxes; i++) {
    const rowIndex = Math.floor((i - 5) / 5); // Which empty row (0-3)
    boxes.push({ letter: '', isFilled: false, opacity: opacities[rowIndex] });
  }

  return (
    <div className="success-grid">
      {boxes.map((box, index) => (
        <div
          key={index}
          className={`grid-cell ${box.isFilled ? 'filled' : 'empty'}`}
          style={{ opacity: box.isFilled ? 1 : box.opacity }}
        >
          {box.letter}
        </div>
      ))}
    </div>
  );
};

