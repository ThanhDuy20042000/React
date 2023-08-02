import classNames from "classnames/bind";
import styled from "./Sidebar.module.scss";

const cx = classNames.bind(styled)
function Sidebar() {
  return (
    <div className={cx('wrapper')}>
        <h1>Sidebar</h1>
    </div>
  )
}

export default Sidebar;