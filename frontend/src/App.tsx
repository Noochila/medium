import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import EditorPage from './pages/Editor';
import ArticlePage from './Components/BlogComponent';
import Home from './pages/Home';
import MyBlog from './pages/Personal';


const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/signin" element={<SignIn></SignIn>} />
        <Route path="/editor" element={<EditorPage></EditorPage>} />
        <Route path="/article/:id" element={<ArticlePage></ArticlePage>} />
        <Route path="/" element={<Home ></Home>} />
        <Route path="/myposts" element={<MyBlog ></MyBlog>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;