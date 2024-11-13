// src/app/layouts/QuestionLayout.tsx
import React, { ReactNode } from 'react';

interface QuestionLayoutProps {
  children: ReactNode;
}

const QuestionLayout: React.FC<QuestionLayoutProps> = ({ children }) => {
  return (
    <div>
        {children}
    </div>
  );
};

export default QuestionLayout;
