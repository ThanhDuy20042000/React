import { useState } from "react";
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import style from "./Header.module.scss";
import styleGolobal from "../../../style/style.module.scss"
import images from "../../../assets";
import Button from "../../../components/Button/button";
import WrapperPopup from "../../../components/Popup";
import AccountItem from "../../../components/Account";
import Menu from "../../../components/Popup/Menu";

//Dùng class name
const cx = classNames.bind(style)
const cg = classNames.bind(styleGolobal)

const MENU_ITEM = [
  {
    icon: 'fa fa-language',
    title: 'Tiếng Việt',
    to: "/",
    children: {
      title: 'Ngôn ngữ',
      data: [
        {
          code: 'vi',
          title: 'Tiếng Việt',
          icon: ''
        },
        {
          code: 'en',
          title: 'English',
          icon: ''
        }
      ]
    }
  },
  {
    icon: 'fa fa-question-circle',
    title: "Phản hồi & Giúp đỡ",
    to: "/"
  },
  {
    icon: 'fa fa-keyboard-o',
    title: "Phím chức năng",
    to: "/"
  },
  {
    icon: 'fa fa-moon-o',
    title: "Chế độ tối",
    to: "/",
    switch: 'on'
  }
]

function Header() {
  const [saerchResult, setSeachResult] = useState('')
  const [stateTippy, setSateTippy] = useState("d-none")

  // Fake API Search Result
  const handleClickSearch = (e) => {
    if (e.length != 0) {
      setSeachResult(e)
    } else {
      setSeachResult('')
    }
  }

  const handleClear = () => {
    setSeachResult('')
    setSateTippy("d-none")
  }

  const currenUser = true

  return (
    <header className={cx('wrapper')}>
      <div className={cx("container")}>
        <div className={cx("logo")}>
          <a href="/">
            <img src={images.logo.default} alt="Logo" />
          </a>
        </div>
        <div>
          <Tippy
            interactive={true} //Select vào trong
            visible={saerchResult.length > 0}
            onShow={() => setSateTippy("d-flex")}
            onClickOutside={handleClear}
            render={attrs => (
              <div className={cg(stateTippy)}>
                <WrapperPopup>
                  <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                    <h5 style={{ margin: 0, color: 'var(--color-text-gray)', fontWeight: 400 }}>Có thể bạn thích</h5>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-gray)', fontWeight: 400 }}>Tài khoản</h5>
                    <AccountItem />
                    <AccountItem />
                    <AccountItem />
                    <AccountItem />
                    <AccountItem />
                  </div>
                </WrapperPopup>
              </div>
            )}>

            <div className={cx("search")}>
              <input className={cx("input-search")} placeholder="Tìm kiếm..." spellCheck={false} onChange={(e) => {
                handleClickSearch(e.target.value)
              }} value={saerchResult} />
              <div className={cx("clear")} onClick={handleClear}>
                <i className="fa fa-times-circle" aria-hidden="true"></i>
              </div>
              <div className={cx("loading")}>
                <i className="fa fa-spinner" aria-hidden="true"></i>
              </div>
              <span className={cx("line-search")}></span>
              <Tippy content="Tìm kiếm">
                <div className={cx("icon-search")}>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </div>
              </Tippy>
            </div>
          </Tippy>
        </div>

        <div className={currenUser ? cx("action", "login") : cx("action")}>
          {currenUser ?
            (<>
              <Button buttonDefault>
                <Tippy content="Tải lên">
                  <i className={cx("font-size-icon", "fa fa-cloud-upload")} aria-hidden="true"></i>
                </Tippy>
              </Button>
              <Button buttonDefault>
                <Tippy content="Tin nhắn">
                  <i className={cx("font-size-icon", "fa fa-comments-o")} aria-hidden="true"></i>
                </Tippy>
              </Button>
            </>) : (<>
              <Button primari >Đăng nhập</Button>
              <Button outline >Đăng ký</Button>
            </>)
          }
          <Menu items={MENU_ITEM}>
            {currenUser ? (
              <img className={cx("avata-user")} src={images.AIphoto} alt="" />
            ) : (
              <a type="button" className={cx('button-dot')}>
                <img src={images.dot.default} className={cx('icon-dot')} alt="" />
              </a>
            )}
          </Menu>
        </div>

      </div >
    </header >)
}

export default Header;