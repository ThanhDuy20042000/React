import { memo } from "react"

function MemoUI({onHandleClick}) {
  console.log('re-render')
  return (
    <>
      <h1> React Memo </h1>
      <button onClick={onHandleClick}>Click</button>
    </>
  )
}

export default memo(MemoUI)