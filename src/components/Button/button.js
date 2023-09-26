import classNames from "classnames/bind";
import style from './button.module.scss'
import { Link } from "react-router-dom";

const cx = classNames.bind(style)
function Button({ onClick, to, href, primari, outline, link, buttonDefault, children,...passProps}) {
  let Compt = 'button'
  const props = {
    onClick,
    ...passProps
  }

  if (to) {
    props.to = to
    Compt = Link
  } else if (href) {
    props.href = href
    Compt = "a"
  }
  const classe = cx('wrapper', {
    primari,
    outline, 
    buttonDefault
  })
  return (
    <Compt className={classe} {...props}>
      <span>{children}</span>
    </Compt>
  );
}

export default Button;