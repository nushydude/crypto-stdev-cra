import React from 'react';

type Props = {
  dca?: boolean;
  best?: boolean;
  children: React.ReactNode;
};

export const BestBuyItem = ({ dca, best, children }: Props) => {
  let backgroundColor = 'bg-pink-200';
  let borderColor = 'border-pink-300';

  if (dca && best) {
    backgroundColor = 'bg-green-200';
    borderColor = 'border-green-300';
  } else if (dca && !best) {
    backgroundColor = 'bg-yellow-100';
    borderColor = 'border-yellow-200';
  }

  return (
    <div
      className={`rounded-lg mb-2.5 p-2.5 border ${backgroundColor} ${borderColor}`}
    >
      {children}
    </div>
  );
};
