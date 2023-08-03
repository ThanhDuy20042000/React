import { Avatar } from '@mui/material';
import { Fragment, useCallback, useRef } from 'react';
import { useState, useEffect } from 'react';

import HandleProduct from '../useMemo';

const courses = [
  {
    "id": 15,
    "title": "HTML CSS Pro",
    "slug": "htmlcss",
    "description": "Từ cơ bản tới chuyên sâu, thực hành 8 dự án.",
    "image": "courses/15/62f13d2424a47.png",
    "icon": "courses/15/62385d6c63dfa.png",
    "video_type": "upload",
    "video": null,
    "old_price": 2499000,
    "price": 1299000,
    "pre_order_price": 699000,
    "students_count": 3628,
    "is_pro": true,
    "is_coming_soon": false,
    "is_selling": true,
    "published_at": "2022-08-18T17:00:00.000000Z",
    "is_registered": false,
    "user_progress": 0,
    "last_completed_at": null,
    "image_url": "https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png",
    "icon_url": "https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png",
    "video_url": "",
    "landing_page_url": "/landing/htmlcss",
    "is_pre_order": false,
    "is_published": true
  },
  {
    "id": 19,
    "title": "JavaScript Pro",
    "slug": "javascript-pro",
    "description": "Khóa học JavaScript Pro",
    "image": "courses/19/62f13cb607b4b.png",
    "icon": "courses/19/62f13cb685c81.png",
    "video_type": "upload",
    "video": null,
    "old_price": 0,
    "price": 0,
    "pre_order_price": 0,
    "students_count": 0,
    "is_pro": true,
    "is_coming_soon": true,
    "is_selling": false,
    "published_at": "2023-07-31T17:00:00.000000Z",
    "is_registered": false,
    "user_progress": 0,
    "last_completed_at": null,
    "image_url": "https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png",
    "icon_url": "https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb685c81.png",
    "video_url": "",
    "landing_page_url": "/landing/javascript-pro",
    "is_pre_order": false,
    "is_published": false
  },
  {
    "id": 20,
    "title": "NextJS Pro",
    "slug": "reactjs-pro",
    "description": "Khóa học NextJS Pro",
    "image": "courses/20/648020fc16597.png",
    "icon": "courses/20/648020fcc8000.png",
    "video_type": "upload",
    "video": null,
    "old_price": 0,
    "price": 0,
    "pre_order_price": 0,
    "students_count": 0,
    "is_pro": true,
    "is_coming_soon": true,
    "is_selling": false,
    "published_at": "2023-11-30T17:00:00.000000Z",
    "is_registered": false,
    "user_progress": 0,
    "last_completed_at": null,
    "image_url": "https://files.fullstack.edu.vn/f8-prod/courses/20/648020fc16597.png",
    "icon_url": "https://files.fullstack.edu.vn/f8-prod/courses/20/648020fcc8000.png",
    "video_url": "",
    "landing_page_url": "/landing/reactjs-pro",
    "is_pre_order": false,
    "is_published": false
  },
  {
    "id": 24,
    "title": "NodeJS Pro",
    "slug": "nodejs-pro",
    "description": "NodeJS Pro",
    "image": "courses/24/648021c0652c6.png",
    "icon": "courses/24/648021c0cd73f.png",
    "video_type": "upload",
    "video": null,
    "old_price": 0,
    "price": 0,
    "pre_order_price": 0,
    "students_count": 0,
    "is_pro": true,
    "is_coming_soon": true,
    "is_selling": false,
    "published_at": "2024-04-06T06:20:00.000000Z",
    "is_registered": false,
    "user_progress": 0,
    "last_completed_at": null,
    "image_url": "https://files.fullstack.edu.vn/f8-prod/courses/24/648021c0652c6.png",
    "icon_url": "https://files.fullstack.edu.vn/f8-prod/courses/24/648021c0cd73f.png",
    "video_url": "",
    "landing_page_url": "/landing/nodejs-pro",
    "is_pre_order": false,
    "is_published": false
  }
]

// UI component
const RenderUI = ({ dataRender }) => (
  // console.log(dataRender),
  <div className='container'>
    {dataRender.map((item, index) => (
      <Fragment key={index}>
        {/* Wrap Elementer */}
        <h3 onClick={DetailOnClick({ item })} >{item.title}</h3>
        <img src={item.image_url} className="img-fluid rounded-top" alt="" />
        <p>{item.description}</p>
      </Fragment>
    ))}
  </div>
)

const RenderList = ({ dataList }) => (
  <>
    <div> {dataList.map((data, index) => (
      // console.log("data", data),
      <div key={index}><img src={data.image_url} /></div>
    ))}
    </div>
  </>
)

const DetailOnClick = ({ item }) => {
  // console.log("Môn", item.title)
}

const ArrayValue = [100, 200, 300]

export default function Home() {
  const [dataPost, setDataPost] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
      .then(response => response.json())
      .then(json => setDataPost(json))
  }, [])

  const [counter, setCounter] = useState(() => {
    const setValue = ArrayValue.reduce((valuPrice, keyPrice) => valuPrice + keyPrice)
    return setValue
  })

  const [cars, setCars] = useState(['Bugatti', 'Roll-Royce', 'Maybach']);

  const handleUpdate = () => {
    setCars((dataSetCart) => {
      console.log(dataSetCart)
      return [...dataSetCart, 'Lamborghini']
    })
  }

  const handleOnClick = () => {
    const numberRamdom = parseInt(Math.random() * 100)
    setCounter(counter + numberRamdom)
  }
  // UX Component
  function Button({ title, onClick, href }) {
    let ComponentButton = "button"
    const props = {}
    // console.log('props: ', props);

    if (href) {
      ComponentButton = 'a'
      props.href = href
    }

    if (onClick) {
      props.onClick = onClick
    }

    return (
      <ComponentButton {...props}>{title}</ComponentButton>
    )
  }

  function DataType({ type, label, ...inputProp }) {
    return (
      <div>
        <label> {label}</label>
        <input {...inputProp} />
      </div>
    )
  }

  const InputComponet = ({ label, ...inputProp }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...inputProp} />
      </div>)
  }

  const gifts = [
    'CPU i19', 'RAM 32GB', 'RAM 64GB'
  ]

  const defaultGit = 'Chưa có phần thưởng'
  const [git, setgit] = useState(defaultGit)
  const handleGitRamdom = () => {
    const index = Math.floor(Math.random() * gifts.length)
    setgit(gifts[index])
    console.log('Git: ', gifts[index]);
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [checked, setChecked] = useState()
  const [checkedBox, setCheckefBox] = useState([])
  const handleSubmitForm = () => {
    console.log({
      name,
      email,
      checked
    })
  }

  const handleOnclickCheckBox = (id) => {
    setCheckefBox(preve => {
      const inChecke = checkedBox.includes(id)
      if (inChecke) {
        return checkedBox.filter(item => item !== id)
      } else {
        return [...preve, id]
      }
    })
  }

  const [jobs, setJobs] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem('Job'))
    return storageData
  })

  const [job, setJob] = useState('')
  const handleAddList = () => {
    if (job.length) {
      setJobs(pre => {
        const dataJob = [...pre, job]
        const jsonJob = JSON.stringify(dataJob)
        localStorage.setItem('Job', jsonJob)
        return dataJob
      })
    } else {
      alert('Chưa điền dữ liệu')
      return
    }
    setJob('')
  }

  // function handle Img
  const [avatar, setAvatar] = useState([])
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar)
    }
  }, [avatar])

  const handleIMG = (e) => {
    const srcImg = e.target.files[0]
    srcImg.src = URL.createObjectURL(srcImg)
    setAvatar(srcImg)
    console.log("avatar", avatar);
  }

  const [dataReviewIMG, setDataReviewIMG] = useState()
  useEffect(() => {
    return () => URL.revokeObjectURL(dataReviewIMG)
  })

  const handleReviewIMG = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      const srcData = e.target.files[0]
      srcData.src = URL.createObjectURL(srcData) //Hàm reder ra URL localhost
      setDataReviewIMG(srcData.src)
    } else {
      alert('Chưa chọn IMG')
      setDataReviewIMG()
      return
    }
  }

  const [numberCouter, setNumberCouter] = useState(0)
  const timeID = useRef()

  const handleStartNumber = () => {
    console.log(numberCouter)
    if (numberCouter != 0) {
      timeID.current = setInterval(() => {
        setNumberCouter(prev => prev - 1)
      }, 1000);
      console.log(timeID)
    } else {
      alert('Chưa nhập số ban đầu')
    }
  }

  const handleStopNumber = (e) => {
    console.log(e.target)
    clearInterval(timeID.current)
  }

  const handleCleaNumber = () => {
    setNumberCouter(0)
    clearInterval(timeID.current)
  }

  const handleChangeNumber = (e) => {
    setNumberCouter(e.target.value)
  }

  const [inoutNumber, setInputNumber] = useState(0)
  const addNumber = useCallback(() => {
    setInputNumber(pre => pre + 1)
  }, [])

  return (
    <>
      <header className="App-header none">
        <div className='number-couter'>
          <h1>Number couter</h1>
          <input type="number" value={numberCouter} onChange={handleChangeNumber} />
          <h2>{numberCouter}</h2>
          <button onClick={handleStartNumber}>Start</button>
          <button onClick={handleStopNumber}>Stop</button>
          <button onClick={handleCleaNumber}>Clead</button>
        </div>

        <div className='input-img'>
          <input type='file' onChange={handleReviewIMG} multiple />
          <img src={dataReviewIMG} style={{ maxWidth: '100%' }} />
        </div>

        <div className='input-img'>
          <input
            type='file'
            onChange={handleIMG}
            multiple
          />
          <img src={avatar.src} style={{ maxWidth: '100%' }} />
        </div>

        <div>
          <table>
            <tbody>
              {dataPost.map((dataPost, index) => (
                <tr key={index}>
                  <td>
                    <h1> {dataPost.name} </h1>
                  </td>
                  <td>
                    <p> {dataPost.email} </p>
                    <p> {dataPost.body} </p>
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
        <form>
          <label>Name :</label>
          <input value={job} onChange={e => setJob(e.target.value)} placeholder='Name' />
          <button onClick={handleAddList} style={{ borderRadius: '0.6em', padding: '1em' }}>Add</button>

          <ul>
            {jobs.map((dataJob, index) => (
              <li key={index} style={{ textAlign: 'left' }}> {dataJob}</li>
            ))}
          </ul>
        </form>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
          <input value={name} required
            onChange={e => setName(e.target.value)}
          />
          <input type='email' required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {courses.map(datLink => (
            <div key={datLink.id}>
              <input type='radio' checked={checked === datLink.id} onChange={() => setChecked(datLink.id)} label="hi"
              />
              {datLink.title}
            </div>
          ))}
          <button onClick={handleSubmitForm} style={{ borderRadius: '0.6em', padding: '1em' }}>Submit</button>
        </form>

        <form>
          {courses.map((data, index) =>
          (
            <Fragment key={index}>
              <input type='checkbox' checked={checkedBox.includes(data.id)} onChange={() => handleOnclickCheckBox(data.id)} />{data.title}
            </Fragment>
          ))}
          <button onClick={handleOnclickCheckBox}>Submit</button>
        </form>

        <h1>{git}</h1>
        <button onClick={handleGitRamdom} style={{ borderRadius: '0.6em', padding: '1em' }}> Click me !</button>

        <h1>ReactJS</h1>
        <button onClick={handleUpdate} style={{ borderRadius: '0.6em', padding: '1em' }}>Update</button>
        <h1 style={{ fontSize: '1em' }}>Hook UseState {counter}</h1>
        <button style={{ borderRadius: '0.6em', padding: '1em', marginBottom: '2em' }} onClick={handleOnClick}>Add value</button>
        <RenderList
          dataList={courses}
        />

        <RenderUI
          dataRender={courses}
        />

        <InputComponet
          label='Email'
          type='text'
          placeholder="Enter email"
          onFocus={() => console.log(Math.random())}
        />

        <DataType
          label="Name"
          type="input"
          placeholder="Enter text"
          title="input"
        />

        <Button
          title="CLick"
          onClick={() => console.log(Math.random())}
          href="/"
        />
      </header >
      <div className='App-header'>
        {/* <MemoUI onHandleClick={addNumber}/>
        <p>{inoutNumber}</p> */}
        <HandleProduct />
      </div> </>
  )
}
