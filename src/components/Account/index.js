import classNames from "classnames/bind";
import style from "./Account.module.scss"
import img from "../../../src/assets"

const cx = classNames.bind(style)
function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <img className={cx('avatar')} src={img.AIphoto} alt="" />
      <div className={cx('wrap-info')}>
        <p className={cx('name')}>
          <span className="nick-name"> À Lôi</span>
          <span><img src={img.tiker.default} className={cx('tiker')}alt="" /> </span>
        </p>
        <p className={cx('info')}> Nguyễn Văn A</p>
      </div>
    </div>
  );
}

export default AccountItem;