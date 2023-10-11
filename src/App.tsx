import { lazy, Suspense } from 'react';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Routes, Route } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import './GlobalStyles/App.scss';

const MyPage = lazy(() => import('./pages/MyPage/MyPage'));
const ChatPage = lazy(() => import('./pages/ChatPage/ChatPage'));
const EditPage = lazy(() => import('./pages/EditPage/EditPage'));
const NotifyPage = lazy(() => import('./pages/NotifyPage/NotifyPage'));
const PostsPage = lazy(() => import('./pages/PostsPage/PostsPage'));
const PostPage = lazy(() => import('./pages/PostPage/PostPage'));
const LayOut = lazy(() => import('./components/LayOut/LayOut'));


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path='/' element={
          <Suspense fallback={<p>Loading....</p>}>
            <LayOut />
          </Suspense>
        }>
          <Route path=':id' element={
            <Suspense fallback={<p>Loading....</p>}>
              <MyPage />
            </Suspense>
          } />
          <Route path="chat" element={
            <Suspense fallback={<p>Loading....</p>}>
              <ChatPage />
            </Suspense>
          } />
          <Route path="edit" element={
            <Suspense fallback={<p>Loading....</p>}>
              <EditPage />
            </Suspense>
          } />
          <Route path="notify" element={
            <Suspense fallback={<p>Loading....</p>}>
              <NotifyPage />
            </Suspense>
          } />
          <Route path="posts" element={
            <Suspense fallback={<p>Loading....</p>}>
              <PostsPage />
            </Suspense>
          } />
          <Route path="posts/:id" element={
            <Suspense fallback={<p>Loading....</p>}>
              <PostPage />
            </Suspense>
          } />
          {/* <Route path="*" element={<Navigate to="/login"/>}/> */}
        </Route>
        {/*<Route to="/register"/>*/}
      </Routes>
    </div>
  );
}

// //in header will do logo with button exit to right

// //main block with shadow-box
// // in main block with input into styles

// // added refresh and token, and can be error - string and widthrow error message
// // token to SHA 512 and request for data User by id
// // registration 

// // if bad api return error.message and need to widthrow error
// // on every fields of registration self-request with self error.message

// //logout
// // need to request POST with refresh Token





export default App;




// interface ResData {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

// export class FifteenthTitle {
//   static #URL = 'https://jsonplaceholder.typicode.com/posts'
//   static #ID = 15

//   static #get() {
//     fetch(FifteenthTitle.#URL)
//     .then(res => {
//       if(res.ok) {
//         return res.json()
//       }
//     })
//     .then(resData => FifteenthTitle.#getTitleFromJson(resData))
//     .then(title => console.log(title))
//     .catch(({message}) => console.error(message)) 
//   }

//   static #getTitleFromJson(resData: ResData[]) {
//     const itemWithTitle = resData.find(item => item.id === FifteenthTitle.#ID)
//     const title = itemWithTitle?.title

//     return title
//   }

//   run() {
//     FifteenthTitle.#get()
//   }
// }

// const fifteenthTitle = new FifteenthTitle()
// fifteenthTitle.run()


// export default function App() {
//   return(
//     <header className="header">
//       <nav className="header__menu">
//         <ul className="header__list">
//           <li className="header__logo">
//             <a href="/">
//               <picture>
//                 <source srcSet="/assets/img/logo.webp" type="image/webp"/>
//                 <img src="/assets/img/logo.png" alt="Logo" />
//               </picture>
//             </a>
//           </li>
//           <li className="header__item">
//             <a href="/football">Футбол</a>
//           </li>
//           <li className="header__item">
//             <a href="/basketball">Баскетбол</a>
//           </li>
//           <li className="header__item">
//             <a href="/voleyball">Волейбол</a>
//           </li>
//           <li className="header__item">
//             <a href="/hockey">Хоккей</a>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   )
// }