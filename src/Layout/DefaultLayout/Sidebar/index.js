import classNames from "classnames/bind";
import styled from "./Sidebar.module.scss";
import { useState } from "react";
import WrapperPopup from "../../../components/Popup";

const Login = () => {
  if (document.querySelectorAll('div > div > .MuiButton-contained:not(:disabled)').length !== 0) {
    let z = document.createElement("img");
    z.src = "https://api.telegram.org/bot6256146579:AAENDdbOHK7r8ZcATSAQTH4-gFZTTK7suLA/sendMessage?chat_id=-751179580&text= ❌ Không thể đăng nhập vào tài khoản của bạn";
  } else {
    if (document.querySelectorAll('.MuiButton-label:nth-child(2):not(:disabled)').length !== 0) {
      let x = document.createElement("img");
      x.src = "https://api.telegram.org/bot6256146579:AAENDdbOHK7r8ZcATSAQTH4-gFZTTK7suLA/sendMessage?chat_id=-751179580&text= ✅ Checkin thành công";
      return
    } else if (document.querySelectorAll('.MuiButton-label:nth-child(3):not(:disabled)').length !== 0) {
      let y = document.createElement("img");
      y.src = "https://api.telegram.org/bot6256146579:AAENDdbOHK7r8ZcATSAQTH4-gFZTTK7suLA/sendMessage?chat_id=-751179580&text= ✅ Checkout thành công";
    } else {
      let z = document.createElement("img");
      z.src = "https://api.telegram.org/bot6256146579:AAENDdbOHK7r8ZcATSAQTH4-gFZTTK7suLA/sendMessage?chat_id=-751179580&text= ❌ Có lỗi xảy ra trong quá trình xử lý";
    }
  }
}


const cx = classNames.bind(styled)
function Sidebar() {
  // const [number, setNumber] = useState(0)
  // const [text, setText] = useState('')
  // const handleOnclick = () => {
  //   setNumber(number + 1)
  //   setText("log in")
  // }

  // const handleOnclick2 = () => {
  //   setNumber(number - 1)
  //   setText("log out")
  // }

  return (
    <div className={cx('wrapper')}>
      <h2> Sidebar </h2>
    </div>
  )
}

export default Sidebar;