import Home from "../pages/Home"
import Following from "../pages/Following"
import Upload from "../pages/Upload"

const publicRouter = [
  { path: '/', component: Home},
  { path: '/following', component: Following},
  { path: '/upload', component: Upload, layout: null}
]


const priverRouter = [
  {

  }
]

export {publicRouter, priverRouter}