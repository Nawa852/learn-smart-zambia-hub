
import React from 'react';
import StudyMaterialRepository from '@/components/StudyMaterials/StudyMaterialRepository';
import MainLayout from '@/components/Layout/MainLayout';

const StudyMaterialRepositoryPage = () => {
  return (
    <MainLayout showSidebar={false}>
      <StudyMaterialRepository />
    </MainLayout>
  );
};

export default StudyMaterialRepositoryPage;
