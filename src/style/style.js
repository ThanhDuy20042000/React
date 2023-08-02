import classNames from "classnames";
import styled from "./style.module.scss";

const cx = classNames.bind(styled)

function Globalstyle({ children }) {
  return (
    children
  );
}

export default Globalstyle