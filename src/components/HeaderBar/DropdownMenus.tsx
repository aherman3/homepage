import { HeaderBarMenu, IHeaderBarMenuProps } from '@src/interfaces';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BaseMenu: NextPage<IHeaderBarMenuProps> = ({
  left,
  style,
  children,
  onMouseLeave,
  onMouseMove,
}) => {
  useEffect(() => {
    if (process.browser) {
      document.querySelectorAll('.dropdown-menu a').forEach((item) => {
        item.addEventListener('click', () => {
          onMouseLeave();
        });
      });
    }
  }, []);
  return (
    <div
      style={{ paddingTop: 70, position: 'fixed' }}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <div
        className="dropdown-menu"
        style={{ ...style, transform: `translateX(${left}px)` }}
      >
        <div className="box">{children}</div>
      </div>
    </div>
  );
};

const MenuItem: NextPage<{
  iconUrl: string;
  hoverIconUrl: string;
  href: string;
}> = ({ iconUrl, hoverIconUrl, href, children }) => {
  const [isHover, toggleHover] = useState(false);
  return (
    <Link href={href}>
      <a>
        <div
          className="dropdown-menu-item"
          onMouseLeave={() => toggleHover(false)}
          onMouseMove={() => toggleHover(true)}
        >
          <Image
            src={isHover ? hoverIconUrl : iconUrl}
            alt="header-icon"
            width="16"
            height="16"
            draggable="false"
          />

          <div style={{ marginLeft: 12 }}>{children}</div>
        </div>
      </a>
    </Link>
  );
};

export const SolutionMenu: NextPage<{
  visibility: boolean;
  current: HeaderBarMenu | null;
  onHide: (current: HeaderBarMenu) => void;
}> = ({ current, visibility, onHide }) => {
  const [styles, setStyles] = useState<CSSProperties>();
  const timerRef = useRef<NodeJS.Timeout>();
  const move = useRef<boolean>(true);
  useMemo(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (current !== null && current !== HeaderBarMenu.SOLUTIONS) {
      setStyles({
        display: 'none',
      });
      return;
    }
    if (visibility) {
      setStyles({
        display: 'flex',
        opacity: 1,
      });
    } else {
      timerRef.current = setTimeout(() => {
        if (current === HeaderBarMenu.SOLUTIONS && !move.current) {
          setStyles({
            opacity: 0,
          });
          timerRef.current = setTimeout(() => {
            setStyles({
              display: 'none',
            });
            onHide(HeaderBarMenu.SOLUTIONS);
          }, 600);
        }
      }, 600);
    }
  }, [visibility, current, onHide]);
  return (
    <BaseMenu
      left={236}
      name={HeaderBarMenu.SOLUTIONS}
      style={{ height: 320, ...styles, width: 520 }}
      key="solutions"
      onMouseMove={() => (move.current = true)}
      onMouseLeave={() => {
        setStyles({
          opacity: 0,
        });
        move.current = false;
        timerRef.current = setTimeout(() => {
          setStyles({
            display: 'none',
          });
        }, 300);
      }}
    >
      <div className="flex-row">
        <div style={{ marginLeft: 8 }}>
          <div className="flex-row title-bar">
            <Image
              src="https://cdn-official-website.juzibot.com/images/icons/header-bar/14.svg"
              alt="menu-icon"
              width="24"
              height="24"
            />
            <span>场景</span>
          </div>
          <MenuItem
            iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/06.svg"
            hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/06-o.svg"
            href="/solutions/general"
          >
            私域全链路解决方案
          </MenuItem>
          <MenuItem
            iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/07.svg"
            hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/07-o.svg"
            href="/solutions/customer-service"
          >
            客服场景解决方案
          </MenuItem>
          <MenuItem
            iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/08.svg"
            hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/08-o.svg"
            href="/solutions/increase"
          >
            增长场景解决方案
          </MenuItem>
          <MenuItem
            iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/09.svg"
            hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/09-o.svg"
            href="/solutions/operate"
          >
            规模化运营解决方案
          </MenuItem>
        </div>

        <div style={{ marginLeft: 16 }}>
          <div className="flex-row title-bar">
            <Image
              src="https://cdn-official-website.juzibot.com/images/icons/header-bar/14.svg"
              alt="menu-icon"
              width="24"
              height="24"
            />
            <span>行业</span>
          </div>
          <MenuItem
            iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/10.svg"
            hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/10-o.svg"
            href="/solutions/consumer-goods"
          >
            消费品行业解决方案
          </MenuItem>
          <MenuItem
            iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/11.svg"
            hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/11-o.svg"
            href="/solutions/education"
          >
            教培行业解决方案
          </MenuItem>
          <MenuItem
            iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/12.svg"
            hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/12-o.svg"
            href="/solutions/health"
          >
            健康行业解决方案
          </MenuItem>
          <MenuItem
            iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/13.svg"
            hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/13-o.svg"
            href="/solutions/finance"
          >
            政务金融行业解决方案
          </MenuItem>
        </div>
      </div>
    </BaseMenu>
  );
};

export const FeatureMenu: NextPage<{
  visibility: boolean;
  current: HeaderBarMenu | null;
  onHide: (current: HeaderBarMenu) => void;
}> = ({ visibility, current, onHide }) => {
  const [styles, setStyles] = useState<CSSProperties>();
  const timerRef = useRef<NodeJS.Timeout>();
  const move = useRef<boolean>(true);
  useMemo(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (current !== null && current !== HeaderBarMenu.FEATURES) {
      setStyles({
        display: 'none',
      });
      return;
    }
    if (visibility) {
      setStyles({
        display: 'flex',
        opacity: 1,
      });
    } else {
      timerRef.current = setTimeout(() => {
        if (current === HeaderBarMenu.FEATURES && !move.current) {
          setStyles({
            opacity: 0,
          });
          timerRef.current = setTimeout(() => {
            setStyles({
              display: 'none',
            });
            onHide(HeaderBarMenu.FEATURES);
          }, 600);
        }
      }, 600);
    }
  }, [visibility, current, onHide]);
  return (
    <BaseMenu
      left={295}
      name={HeaderBarMenu.FEATURES}
      style={{ height: 314, ...styles }}
      key="features"
      onMouseMove={() => (move.current = true)}
      onMouseLeave={() => {
        setStyles({
          opacity: 0,
        });
        move.current = false;
        timerRef.current = setTimeout(() => {
          setStyles({
            display: 'none',
          });
        }, 300);
      }}
    >
      <MenuItem
        iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/01.svg"
        hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/01-o.svg"
        href="/features/customer-acquisition"
      >
        规模获客
      </MenuItem>
      <MenuItem
        iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/02.svg"
        hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/02-o.svg"
        href="/features/sop"
      >
        精准触达
      </MenuItem>
      <MenuItem
        iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/03.svg"
        hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/03-o.svg"
        href="/features/contact-platform"
      >
        急速应答
      </MenuItem>
      <MenuItem
        iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/04.svg"
        hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/04-o.svg"
        href="/features/management"
      >
        高效管理
      </MenuItem>
      <MenuItem
        iconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/05.svg"
        hoverIconUrl="https://cdn-official-website.juzibot.com/images/icons/header-bar/05-o.svg"
        href="/features/data-center"
      >
        数据驱动
      </MenuItem>
    </BaseMenu>
  );
};

export const QRCodeToast: NextPage<{ visibility: boolean }> = ({
  visibility,
}) => {
  const { t } = useTranslation(['common']);
  return (
    <div className={`contact-menu ${visibility ? 'visible' : 'hidden'}`}>
      <div className="box">
        <Image
          src="https://cdn-official-website.juzibot.com/images/contact-qrcode.png"
          width="200"
          height="200"
          alt="qrcode"
          draggable="false"
        />

        <span>{t('lets-talk-scan-qrcode')}</span>
      </div>
    </div>
  );
};
