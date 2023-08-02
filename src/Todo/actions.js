import {SET_JOB} from "./constants"
//action
const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload
  }
}
