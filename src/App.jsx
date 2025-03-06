import {useEffect, useState} from 'react'
import './App.css'
import profiles from './assets/profile.json';
import messages from './assets/wiadomosci.json';
import { createId } from '@paralleldrive/cuid2';
import 'bootstrap/dist/css/bootstrap.css';


// id, data, twórca, tytuł, treść
class Post{
  constructor(author, title, content){
    this.author = author;
    this.title = title;
    this.content = content;
    this.id = createId();
    this.date = new Date().toLocaleString("pl-pl")
  }
}


function App() {
  const [posts, setPosts] = useState([])
  function generatePost() {
    const profileIndex = Math.floor(Math.random() * profiles.length)
    const profile = profiles[profileIndex]

    const messageIndex = Math.floor(Math.random() * messages.length)
    const message = messages[messageIndex]

    const post = new Post(profile.nazwa, message.tytul, message.tresc);

    setPosts([post, ...posts]);
  }

  useEffect(() => {
    const intervalId = setInterval(generatePost, 3000);
    return () => clearInterval(intervalId);
  }, [generatePost]);

    const [formData, setFormData] = useState({
        author: '',
        title: '',
        content: ''
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.author || !formData.title || !formData.content) return;

        const newPost = new Post(formData.author, formData.title, formData.content);
        setPosts([newPost, ...posts]);
        setFormData({ author: '', title: '', content: '' });
    }

  const postsToDisplay = posts.map(p => <div key={p.id}>
    <div className="card text-center">
      <div className="card-header">
        {p.author}
      </div>
      <div className="card-body">
        <h5 className="card-title">{p.title}</h5>
        <p className="card-text">{p.content}</p>
      </div>
      <div className="card-footer text-body-secondary">
        Date: {p.date}
      </div>
    </div>
  </div>)

  return (
      <div className="container-fluid">
        <button onClick={generatePost}>Wygeneruj post</button>
          <div className="container mt-3">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title text-center">Dodaj nowy post</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <input type="text" className="form-control" name="author" placeholder="Autor"
                                       value={formData.author} onChange={handleChange}/>
                            </div>
                            <div className="mb-2">
                                <input type="text" className="form-control" name="title" placeholder="Tytuł"
                                       value={formData.title} onChange={handleChange}/>
                            </div>
                            <div className="mb-2">
                                <textarea className="form-control" name="content" placeholder="Treść"
                                          value={formData.content} onChange={handleChange}/>
                            </div>
                            <button type="submit" className="btn btn-success w-100">Dodaj post</button>
                        </form>
                    </div>
                </div>
            </div>
        {postsToDisplay}
      </div>
  )
}

export default App
