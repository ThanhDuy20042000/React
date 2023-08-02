import React, { Fragment, useEffect, useMemo, useReducer, useRef, useState } from "react";
import './App.css'

//init state
//reducer
//Dispatch

const [state, dispatchJob] = useReducer(reduce, initState)
const { job, jobs } = state
const RenderUIJob = () => (
  <>
    <p>{job}</p>
    <input value={job} onChange={(e) => {
      dispatchJob(setJob(e.target.value))
    }} />
    <button>Add Job</button>
    {/* <ul>
        {jobs.map((data, index) => (
          <li key={index}> {data.job}</li>
        ))}
      </ul> */}
  </>
)

return (
  <div className="dflex">
    <h1>React Reducer</h1>
    <RenderUIJob />
    <p>{value}</p>
    <button onClick={() => dispatch(UP_ACTION)}>Up</button>
    <button onClick={() => dispatch(DOWN_ACTION)}>Dow</button>
    <h1>React UseMemo</h1>
    <input ref={focusElement} value={name} onChange={(e) => setName(e.target.value)} required />
    <input value={price} type="number" onChange={(e) => setPrice(e.target.value)} required />
    <button onClick={handleAddProduct} disabled={isAddButtonDisabled}>Thêm sản phẩm</button>
    <p> Tổng tiền {formatCurrencyVND(handleTotal)} </p>
    <div>
      {product.length === 0 ? (<p>Chưa có sản phẩm nào</p>) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {product.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{formatCurrencyVND(data.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={handleRemove}>Xoá</button>
    </div>
    <RenderUIMemo />
  </div>
);

export default HandleProduct;
