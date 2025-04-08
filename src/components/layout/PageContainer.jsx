import React from 'react';

/**
 * PageContainer component that provides consistent padding for pages
 * to account for the fixed navbar height
 */
export const PageContainer = ({ children, className = '' }) => {
  return (
    <div className={`pt-[66px] ${className}`}>
      {children}
    </div>
  );
};