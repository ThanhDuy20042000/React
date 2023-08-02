import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styled);

function DefaultLayout({children}) {
  return (  
    <div className={cx('wrapper')}>
      <Header/>
      <div className={cx('container')}>
        <Sidebar/>
        <div className={cx('')}> {children} </div>
      </div>
    </div>
  );
}

export default DefaultLayout;