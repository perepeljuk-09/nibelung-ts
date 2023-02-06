import {lazy, Suspense} from 'react';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Routes, Route} from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import './GlobalStyles/App.scss';

const MyPage = lazy(() => import('./pages/MyPage/MyPage'))
const ChatPage = lazy(() => import('./pages/ChatPage/ChatPage'))
const NotifyPage = lazy(() => import('./pages/NotifyPage/NotifyPage'))
const PostsPage = lazy(() => import('./pages/PostsPage/PostsPage'))
const LayOut = lazy(() => import('./components/LayOut/LayOut'))

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/registration" element={<RegistrationPage/>}/>
        <Route path='/' element={
          <Suspense fallback={<p>Loading....</p>}>
            <LayOut/>
          </Suspense>
        }>
            <Route path=':id' element={
              <Suspense fallback={<p>Loading....</p>}>
                <MyPage/>
              </Suspense>
              }/>
            <Route path="chat" element={
              <Suspense fallback={<p>Loading....</p>}>
                <ChatPage/>
              </Suspense>
              }/>
            <Route path="notify" element={
              <Suspense fallback={<p>Loading....</p>}>
                <NotifyPage/>
              </Suspense>
              }/>
            <Route path="posts" element={
              <Suspense fallback={<p>Loading....</p>}>
                <PostsPage/>
              </Suspense>
            }/>
          {/* <Route path="*" element={<Navigate to="/login"/>}/> */}
        </Route>
        {/*<Route to="/register"/>*/}
        </Routes>
    </div>
  );
}

//in header will do logo with button exit to right

//main block with shadow-box
// in main block with input into styles

// added refresh and token, and can be error - string and widthrow error message
// token to SHA 512 and request for data User by id
// registration 

// if bad api return error.message and need to widthrow error
// on every fields of registration self-request with self error.message

//logout
// need to request POST with refresh Token





export default App;
