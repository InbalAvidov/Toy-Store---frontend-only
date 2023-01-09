import {HashRouter as Router , Routes , Route} from 'react-router-dom'
import { Provider } from 'react-redux'


import './assets/style/main.css'
import { store } from './store/store'
import { HomePage } from './views/home-page'
import { AppHeader } from './cmps/app-header'
import { ToyIndex } from './views/toy-index'
import { ToyDetails } from './views/toy-details'
import { ToyEdit } from './views/toy-edit'
import { UserMsg } from './cmps/user-msg'


export function App() {
  return (
      <Provider store={store}>
          <Router>
              <section className="main-layout app">
                  <AppHeader />
                  <main>
                      <Routes>
                          <Route element={<HomePage />} path="/" /> 
                          {/* <Route element={<AboutUs />} path="/about" /> */}
                         <Route element={<ToyIndex />} path="/toy" />
                         <Route element={<ToyDetails />} path="/toy/details/:toyId" />
                         <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                         <Route element={<ToyEdit />} path="/toy/edit" />

                      </Routes>
                  </main>
                  {/* <AppFooter /> */}
                  <UserMsg />
              </section>
          </Router>
      </Provider>
  )
}
