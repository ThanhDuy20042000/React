import classNames from 'classnames/bind';
import style from './popup.module.scss'

const cx = classNames.bind(style)

function WrapperPopup({children}) {
  return (
    <div className={cx('wrap-popup')}>
      {children}
    </div>
  );
}

export default WrapperPopup;