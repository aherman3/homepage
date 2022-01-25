import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { IFeatureHeroPageProps } from '@src/interfaces';

export const FeatureHeroPage: NextPage<IFeatureHeroPageProps> = ({
  title,
  brief,
  docsUrl,
  datas,
}) => {
  return (
    <>
      <h1>{title}</h1>

      <section className="brief">{brief}</section>

      <div className="buttons-bar">
        <button
          className="primary-button start-button"
          onClick={() => {
            if (process.browser)
              window.open('https://qiwei.juzibot.com/user/login');
          }}
        >
          立即使用
        </button>
        <Link href={docsUrl}>
          <a className="read-docs" target="_blank">
            阅读手册
          </a>
        </Link>
      </div>

      <div className="data-bar">
        {datas.map(({ title, subtitle, icon }) => (
          <div className="item" key={title}>
            <Image
              src={icon}
              alt="icon"
              width="48"
              height="48"
              draggable="false"
            />
            <div className="info">
              <h3>{title}</h3>
              <div>{subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};