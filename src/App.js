import { Routes, Route, Link, Router } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import { publicRouter } from './router';
import { DefaultLayout } from './Layout';
import { Fragment } from 'react';

export default function App() {
  return (
    <div className="App">
      {/* <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/following'>Following</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        {publicRouter.map((router, index) => {
          const Page = router.component
          let Layout = DefaultLayout
          if (router.layout) {
            Layout = router.layout
          } else if (router.layout === null) {
              Layout = Fragment
          }
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>} />
            )
        })}
      </Routes>
    </div >
  );
}
