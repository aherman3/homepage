import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { IMenuItemProps, ITranslationProps } from '@src/interfaces';
import { useState } from 'react';

const MenuItem: NextPage<IMenuItemProps> = ({ hasArrow, children, href }) => {
  return (
    <Link href={href}>
      <a className="menu-item" draggable="false">
        <span>{children}</span>
        {hasArrow ? (
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: 4 }}
          >
            <path
              d="M4.99999 3.78132L8.29999 0.481323L9.24266 1.42399L4.99999 5.66666L0.757324 1.42399L1.69999 0.481323L4.99999 3.78132Z"
              fill="#54657E"
            />
          </svg>
        ) : null}
      </a>
    </Link>
  );
};

const HeaderBar: NextPage<ITranslationProps> = ({ t }) => {
  const [borderBottomVisible, setBorderBottomVisible] = useState(false);

  if (process.browser) {
    window.addEventListener('scroll', () => {
      setBorderBottomVisible(window.scrollY > 0);
    });
  }
  return (
    <header
      className="wrapper header-bar"
      style={{ borderBottom: borderBottomVisible ? '1px solid #eee' : '1px solid #ffffffff' }}
    >
      <div className="container">
        <menu className="header-left">
          <a className="logo" href="https://juzi.bot">
            <Image src="/images/logo.svg" width={120} height={64} draggable="false"></Image>
          </a>
          <MenuItem hasArrow href="/">
            {t('products')}
          </MenuItem>
          <MenuItem hasArrow href="/">
            {t('solutions')}
          </MenuItem>
          <MenuItem href="/">{t('cases')}</MenuItem>
          <MenuItem href="/">{t('course')}</MenuItem>
          <MenuItem href="/">{t('developer')}</MenuItem>
          <MenuItem href="/">{t('about')}</MenuItem>
        </menu>

        <menu className="header-right">
          <MenuItem hasArrow href="/">
            {t('language')}
          </MenuItem>
          <Link href="/">
            <a className="menu-item primary-link" draggable="false">
              {t('lets-talk')}
            </a>
          </Link>
          <Link href="/">
            <a className="menu-item primary-link round" draggable="false">
              {t('login')}
            </a>
          </Link>
        </menu>
      </div>
    </header>
  );
};

export default HeaderBar;
