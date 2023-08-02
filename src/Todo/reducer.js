const initState = {
  job: '',
  jobs: []
}

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