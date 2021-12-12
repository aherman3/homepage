import { NextPage } from 'next';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Parallax, Controller, Swiper as SwiperType, EffectFade } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { IFeatureSwiperItemProps } from '@src/interfaces';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import { debounce } from 'lodash';

const FeatureSwiperItem: NextPage<IFeatureSwiperItemProps> = ({
  title,
  subTitle,
  brief,
  iconUrl,
  index,
}) => {
  useEffect(() => {
    if (process.browser) {
      Aos.init();
    }
  }, []);
  return (
    <div className="feature-swiper-item" data-aos="fade-in">
      <div className="content">
        <div data-swiper-parallax="-300">
          <div className="num">
            <Image
              src={`/images/icons/0${index}.svg`}
              width="97"
              height="130"
              draggable="false"
              alt="num"
            />
          </div>
          <h1 className="title">{title}</h1>
        </div>

        <div className="subtitle" data-swiper-parallax="-300">
          {subTitle}
        </div>
        <div className="brief" data-swiper-parallax="-200">
          {brief}
        </div>
        <Link href="/">
          <a className="read-more" data-swiper-parallax="-300">
            了解更多 →
          </a>
        </Link>
      </div>
      <div className="image">
        <Image src={iconUrl} draggable="false" width="608" height="560" alt="picture" />
      </div>
    </div>
  );
};

const FeatureSwiper: NextPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | undefined>(undefined);
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timer>();
  const items: IFeatureSwiperItemProps[] = [
    {
      title: '规模获客',
      subTitle: '规模化激活沉默关系链',
      brief:
        '我们打通多个第三方 AI 外呼平台，可以规模化将过去仅能通过短信单向触达的沉默客户关系变成可双向沟通、多维度触达的社交关系链，全程自动化完成获客成本低至 5 元。',
      iconUrl: '/images/feat-01.png',
    },
    {
      title: '精准触达',
      subTitle: '机器代劳，规模化运营千万用户',
      brief:
        '基于 RPA 技术，调遣全年无休的机器人团队，你可以为机器人配置多场景，多流程规则，在一杯咖啡的时间里，让它们完成千万级客户的响应和触达。',
      iconUrl: '/images/feat-02.png',
    },
    {
      title: '高效沟通',
      subTitle: '一键应答客户在任意 IM 发来的消息',
      brief:
        '我们提供了聚合多种 IM 平台的能力，让你能在一个后台处理多种会话消息，主动触达多平台客户，无论他们来自微信、抖音、5G 短信、Whatsapp 还是其他。',
      iconUrl: '/images/feat-03.png',
    },
    {
      title: '绩效管理',
      subTitle: '人效 + 业务双引擎驱动管理提效',
      brief:
        '我们提供了聚合多种 IM 平台的能力，让你能在一个后台处理多种会话消息，主动触达多平台客户，无论他们来自微信、抖音、5G 短信、Whatsapp 还是其他。',
      iconUrl: '/images/feat-04.png',
    },
    {
      title: '数据驱动',
      subTitle: '让每一个决策更科学',
      brief:
        '我们提供从增长到活跃到转化的一切业务数据和人效数据统计，为管理者提供更科学的业务流程和团队管理决策依据。',
      iconUrl: '/images/feat-05.png',
    },
  ];

  function autoplay(s?: SwiperType) {
    s = s || swiper;
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
    const _autoPlayInterval = setInterval(() => {
      if (!s) return;
      if (s.isEnd) {
        s.slideTo(0);
      } else {
        s.slideNext();
      }
    }, 8000);
    setAutoPlayInterval(_autoPlayInterval);
  }

  const debounceAutoPlay = debounce(() => autoplay(swiper));

  return (
    <>
      <div className="feature-swiper">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Navigation, Parallax, Controller, EffectFade]}
          style={{ width: '100%' }}
          parallax={{ enabled: true }}
          onSwiper={(swiper) => {
            setSwiper(swiper);
            autoplay(swiper);
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          onActiveIndexChange={(swiper) => {
            setCurrentIndex(swiper.activeIndex);
            debounceAutoPlay();
          }}
          controller={{ control: swiper }}
        >
          {items.map((props, idx) => (
            <SwiperSlide key={idx + 1}>
              <FeatureSwiperItem {...props} index={idx + 1} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="pagination">
          {items.map((_, idx) => (
            <div
              key={idx + 1}
              className={currentIndex === idx ? 'active' : 'normal'}
              onClick={() => {
                swiper?.slideTo(idx);
              }}
            >
              <div
                style={{
                  visibility: currentIndex === idx ? 'visible' : 'hidden',
                  width: '100%',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeatureSwiper;