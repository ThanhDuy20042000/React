import React, { Fragment, useEffect, useMemo, useReducer, useRef, useState } from "react";
import './App.css'
import GlobalStyles from "./Todo/Globalstyle";

function HandleProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [product, setProduct] = useState([]);
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1/comments').then(json => json.json()).then(Json => setBlog(Json))
    console.log(blog)
  }, [])

  function formatCurrencyVND(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
  }

  const handleAddProduct = () => {
    if (name && price) {
      setProduct([...product, { name, price: parseInt(price) }]);
      setName('');
      setPrice('');
      focusElement.current.focus()
    }
  };

  const handleTotal = useMemo(() => {
    product.reduce((total, item) => {
      const result = total + item.price
      return result
    }, 0)
  }, [product])

  const handleRemove = () => {
    setProduct([]);
    setName('');
    setPrice('');
  };

  const isAddButtonDisabled = !name || !price; // Kiểm tra xem nút "Thêm sản phẩm" có bị disable không

  const RenderUIMemo = () => (
    blog.map(datamap => (
      <Fragment key={datamap.id}>
        <p>Name: {datamap.body}</p>
        <p>Email: {datamap.email}</p>
      </Fragment>
    ))
  )

  const focusElement = useRef()

  //action
  const UP_ACTION = 'up'
  const DOWN_ACTION = 'dow'

  const handleReduce = (state, value) => {
    switch (value) {
      case UP_ACTION:
        return state + 1
      case DOWN_ACTION:
        return state - 1
      default:
        return
    }
  }

  const [value, dispatch] = useReducer(handleReduce, 0)

  //init state
  const initState = {
    job: '',
    jobs: []
  }

  //action
  const SET_JOB = 'set_job'
  const ADD_JOB = 'add_job'
  const REMOVE_JOB = 'remove_job'

  const setJob = (payload) => {
    return {
      type: SET_JOB,
      payload
    }
  }

  //reducer
  const reduce = (state, action) => {
    let newSate
    console.log('valueJob', state)
    console.log('action', action)
    switch (action.type) {
      case SET_JOB:
        newSate = {
          ...state,
          job: action.payload
        }
        break
      default:
        throw new console.error('invalid');
    }
    console.log(newSate)
    return newSate
  }

  //Dispatch
  const [state, dispatchJob] = useReducer(reduce, initState)
  const { job, jobs } = state

  const RenderUIJob = () => (
    <>
      <p>{job}</p>
      <input value={job} onChange={(e) => {
        dispatchJob(setJob(e.target.value))
      }} />
      <button className="btn primari">Add Job</button>
      {/* <ul>
        {jobs.map((data, index) => (
          <li key={index}> {data.job}</li>
        ))}
      </ul> */}
    </>
  )
  return (
    <GlobalStyles>
    <div className="dflex">
      <h1>React Reducer</h1>
      <RenderUIJob />
      <p>{value}</p>
      <button onClick={() => dispatch(UP_ACTION)}>Up</button>
      <button onClick={() => dispatch(DOWN_ACTION)}>Dow</button>
      <h1>React UseMemo</h1>
      <input ref={focusElement} value={name} onChange={(e) => setName(e.target.value)} required />
      <input value={price} type="number" onChange={(e) => setPrice(e.target.value)} required />
      <button className="btn primari" onClick={handleAddProduct} disabled={isAddButtonDisabled}>Thêm sản phẩm</button>
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
    </GlobalStyles>
  );
}

export default HandleProduct;
