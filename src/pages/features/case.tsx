/* eslint-disable no-unreachable */
import { isBrowserChrome } from '@src/utils/isBrowserChrome';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import Seo from '@src/components/common/Seo';
import { useMediaQuery } from '@react-hookz/web';
import ContactUsModal from '@src/components/ContactUsModal';
import { useShowModal } from '@src/utils/showModal';
import FooterBarWithButton from '@src/components/FooterBarWithButton';

const CustomerAcquisitionPage: NextPage = () => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 600px)');
  const [, toggleChrome] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const showPcModal = useShowModal();
  useEffect(() => {
    toggleChrome(isBrowserChrome());
  }, []);
  if (isSmallDevice) {
    return (
      <div className='m-auto pt-[50px] relative'>
        <Seo page="features-case" />
        <img className='w-full' alt='' src="/_images/image-page/case-00.png" />
        <div
          onClick={() => setShowModal(true)}
          className='w-[152px] h-[56px] rounded-[100px] flex justify-center items-center text-[18px] font-semibold text-white absolute top-[7%] left-[50%] cursor-pointer'
          style={{ transform: 'translate(-50%)', boxShadow: ' 0px 35px 50px -15px rgba(52, 128, 239, 0.3)' }}
        >
        </div>
        <div className="wrapper appeal-bar">
          <div className="container !w-[100%]">
            <FooterBarWithButton 
              contactUsOption={{ qrCode: 'sf-04' }}
            />
          </div>
        </div>
        <ContactUsModal
          qrCode='sf-04'
          open={showModal}
          onCancel={() => setShowModal(false)}
        />
      </div>
    );
  }
  return (
    <div className='m-auto pt-[50px] relative'>
      <Seo page="features-case" />
      <div
        onClick={() => showPcModal({ qrCode: 'sf-04' })}
        className='w-[152px] bg-[#0555FF] h-[56px] rounded-[100px] flex justify-center items-center text-[18px] font-semibold text-white absolute top-[14%] left-[50%] cursor-pointer'
        style={{ transform: 'translate(-50%)', boxShadow: ' 0px 35px 50px -15px rgba(52, 128, 239, 0.3)' }}
      >
        预约咨询
      </div>
      <img className='w-full' alt='' src="/_images/image-page/case-0.png" />
      <div className="wrapper appeal-bar">
        <div className="container">
          <FooterBarWithButton 
            contactUsOption={{ qrCode: 'sf-04' }}
          />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'zh', [
        'common',
        'homepage',
        'seos',
        'features',
      ])),
      locale: locale?.toLowerCase() ?? 'zh',
    },
  };
};

export default CustomerAcquisitionPage;
