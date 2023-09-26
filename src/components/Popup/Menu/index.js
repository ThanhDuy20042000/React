import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import style from "./Menu.module.scss";
import WrapperPopup from "..";
import MenuListItem from "./MenuItem";
import Header from "./Header";
import { useState } from "react";

const cx = classNames.bind(style)

function Menu({ children, items }) {
  const [history, setHistory] = useState([{ data: items }])
  const currentItems = history[history.length - 1] //truy cập phần tử cuối cùng trong mảng

  const handleOnchange = (item) => {
    console.log(item);
  }

  const listMenu = () => {
    return currentItems.data.map((item, index) => {
      const isParent = !!item.children; //Kiểm tra xem item có Children hay không, (!!) trả về giá trị Boolean
      return (
        <MenuListItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory(pre => [...pre, item.children])
            } else {
              handleOnchange(item)
            }
          }} />)
    })
  }

  const [handleTippy, setHandleTippy] = useState("d-flex")

  return (
    <div>
      <Tippy
        interactive
        placement="bottom-end"
        delay={[0, 500]}
        onShow={() => setHandleTippy("d-flex")}
        onHide={() => {
          setHandleTippy("d-none")
          setHistory(pre => pre.slice(0, 1))
        }}
        render={(attrs) => (
          <div className={cx(handleTippy)}>
            <WrapperPopup>
              <div className={cx("menu-icon")} tabIndex="-1" {...attrs}>
                {/* Kiểm tra history có lớn hơn 1 không nếu thỏa hiển thị Header */
                  history.length > 1 && <Header title="Ngôn ngữ" onBack={() => {
                    setHistory(pre => pre.slice(0, [pre.length - 1]))
                  }} />
                }
                {listMenu()}
              </div>
            </WrapperPopup>
          </div>
        )}>
        {children}
      </Tippy>
    </div >
  );
}

export default Menu;