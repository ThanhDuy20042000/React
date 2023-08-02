import GlobalStyles from "../Todo/Globalstyle"
import style from "../Todo/Style/style"
import clsx from "clsx"

function Button({ primari }) {
  const classes = clsx(style.btn, {
    [style.primari]: primari,
  })

  return (
    <>
      <button className={classes}>Click me</button>
      <button className={style.btn}>Click</button>
    </>
  )
}

export default Button