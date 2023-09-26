import classNames from "classnames/bind";

import Button from "../../Button/button";
import style from './Menu.module.scss'
import { Switch } from "@mui/material";

const cx = classNames.bind(style)

function MenuListItem({ data, onClick }) {
  return (
    <div className={cx('wrap-menu-button')}>
      <Button to={data.to} style={{ padding: '0.5em', width: '100%' }} onClick={onClick}>
        <div className={cx('button-icon')}>
          <div className={cx('d-flex')}>
            {data?.icon &&
              <span className={cx('wrap-button-icon')}>
                <i className={cx(data.icon, 'font-size-icon')} alt="" />
              </span>
            }
            <span>{data.title}</span>
          </div>
          {data.switch && <Switch />}
        </div>
      </Button>
    </div>
  )
}

export default MenuListItem;