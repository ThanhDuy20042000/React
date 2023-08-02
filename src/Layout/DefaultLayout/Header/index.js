import classNames from "classnames/bind";
import style from "./Header.module.scss";
import images from "../../../assets";

const cn = classNames.bind(style)

function Header() {
  return (
    <header className={cn('wrapper')}>
      <div className={cn("container")}>
        <div className={cn("logo")}>
          <img src={images.logo.default} alt="Logo" />
        </div>
        <div className={cn("search")}>
          <input className={cn("input-search")} placeholder="Tìm kiếm..." spellCheck={false} />
          <div className={cn("clear")}>
            <i class="fa fa-times-circle" aria-hidden="true"></i>
          </div>
          <div className={cn("loading")}>
            <i class="fa fa-spinner" aria-hidden="true"></i>
          </div>
          <span className={cn("line-search")}></span>
          <div className={cn("icon-search")}>
            <i class="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <div className={cn("action")}>

        </div>
      </div>
    </header>)
}

export default Header;