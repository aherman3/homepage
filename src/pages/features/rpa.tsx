/* eslint-disable no-unreachable */
import { isBrowserChrome } from '@src/utils/isBrowserChrome';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import Seo from '@src/components/common/Seo';
import { useMediaQuery } from '@react-hookz/web';
import FooterBarWithButton from '@src/components/FooterBarWithButton';
import Typewriter from 'typewriter-effect';

const CustomerAcquisitionPage: NextPage = () => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 600px)');
  const [, toggleChrome] = useState(true);
  useEffect(() => {
    toggleChrome(isBrowserChrome());
  }, []);
  // if (isSmallDevice) {
  //   return (
  //     <div className='m-auto'>
  //       <Seo page="features-rpa" />
  //       <img className='w-full' alt='' src='/_images/image-page/rpa-0.png' />
  //       <div className="wrapper appeal-bar">
  //         <div className="container !w-[100%]">
  //         <FooterBarWithButton
  //           contactUsOption={{ type: 'rpa', qrCode: 'sf-03' }}
  //         />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  const strings = ['企业微信', '微信客服', '微信公众号', '小程序', 'WhatsApp', '飞书', '5G消息', '小红书', '抖音'];

  if (isSmallDevice) {
    return (
      <div className='m-auto'>
        <Seo page="features-rpa" />
        <div className="relative">
          <img className='w-full' alt='' src="/_images/image-page/rpa-top-20240206-m.png"/>
          <div className="absolute top-0 h-[200px] w-full flex justify-center items-center">
            {/* 文字 */}
            <div className="w-full font-sans">
              <div className="text-center text-[18px] text-block">RPA 驱动的，基于 IM 的营销服务一体化平台</div>
              <div className="flex text-[29px] font-medium">
                <span className="w-1/2 flex-shrink-0 text-block text-right">可自由接入</span>
                <Typewriter
                  options={{
                    wrapperClassName: 'text-[29px] text-[#0555FF]',
                    cursorClassName: 'text-[#0555FF]',
                    strings,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <img className='w-full' alt='' src='/_images/image-page/rpa-middle-20240206-m.png' />
        <div className="wrapper appeal-bar">
          <div className="container !w-[100%]">
            <FooterBarWithButton
              contactUsOption={{ type: 'rpa', qrCode: 'sf-03' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='m-auto'>
      <Seo page="features-rpa" />
      <div className="relative">
        <img className='w-full' alt='' src="/_images/image-page/rpa-top-20240206.png"/>
        <div className="absolute top-10 h-[50vh] w-full flex justify-center items-center">
          {/* 文字 */}
          <div className="w-full font-sans">
            <div className="text-center text-[56px] text-block">RPA 驱动的，基于 IM 的营销服务一体化平台</div>
            <div className="flex text-[65px] font-medium">
              <span className="w-1/2 flex-shrink-0 text-block text-right">可自由接入</span>
              <Typewriter
                options={{
                  wrapperClassName: 'text-[65px] text-[#0555FF]',
                  cursorClassName: 'text-[#0555FF]',
                  strings,
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <img className='w-full' alt='' src='/_images/image-page/rpa-middle-20240206.png' />
      <div className="wrapper appeal-bar">
        <div className="container">
          <FooterBarWithButton
            contactUsOption={{ type: 'rpa', qrCode: 'sf-03' }}
          />
        </div>
      </div>
    </div>
  )

  // 旧的
  return (
    <div className='m-auto'>
      <Seo page="features-rpa" />
      <img className='w-full mt-[72px]' alt='' src='/_images/image-page/rpa-00.jpg' />
      <div className="wrapper appeal-bar">
        <div className="container">
          <FooterBarWithButton
            contactUsOption={{ type: 'rpa', qrCode: 'sf-03' }}
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
