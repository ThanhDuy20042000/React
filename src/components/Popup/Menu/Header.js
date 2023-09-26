import classNames from "classnames/bind";
import style from './Menu.module.scss'

const cx = classNames.bind(style)

function Header({ title, onBack }) {
  return (
      <header className={cx("wrap-header")} onClick={onBack}>
        <i className="fa fa-chevron-left" />
        <h4>{title}</h4>
      </header>
  )
}

export default Header;