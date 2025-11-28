import React from 'react';
import { Contact as ContactSection } from '../components/features/contact';
import { PageContainer } from '../components/layout';
import Seo from '../components/common/Seo';

const Contact = () => {
  return (
    <PageContainer>
      <Seo title="Contact" description="Get in touch with Kartikey Kumar for freelance projects, job opportunities, or collaborations." />
      <ContactSection />
    </PageContainer>
  );
};

export default Contact;