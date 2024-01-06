import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { auth, db, storage } from "./config/firebase";
import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  const movieCollectionRef = collection(db, "movies");

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [recievedO, setRecievedO] = useState(false);

  const [updatedMovieName, setUpdatedMovieName] = useState("");

  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const fData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieList(fData);
      // console.log(movieList[0].title);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
    alert("Movie Deleted");
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedMovieName });
    getMovieList();
    alert("Movie Updated");
  };

  useEffect(() => {
    getMovieList();
    // return () => {
    //   second
    // }
  }, []);
  const addMovieToDB = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releasDate: newReleaseDate,
        recOscar: recievedO,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
      alert("Movie Added");
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async () => {
    if (fileUpload === null) return;
    const filesFolderRef = ref(storage, `images/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      alert("File Uploaded Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      <Auth />
      <div>
        <input
          type='text'
          placeholder='Movie Name'
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type='number'
          placeholder='Release Date'
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type='checkbox'
          name='ro'
          id='ro'
          checked={recievedO}
          onChange={(e) => setRecievedO(e.target.checked)}
        />
        <label htmlFor='ro'>Received an Oscar</label>
        <button onClick={addMovieToDB}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.recOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>{movie.releasDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder='Movie Title'
              type='text'
              onChange={(e) => setUpdatedMovieName(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update</button>
          </div>
        ))}
      </div>
      <div>
        <input
          onChange={(e) => setFileUpload(e.target.files[0])}
          type='file'
          name=''
          id=''
        />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
