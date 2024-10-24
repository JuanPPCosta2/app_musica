import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {
  const [album, setAlbum] = useState([]);
  const [filtro, setFiltro] = useState([]);
  const [input, setInput] = useState('');

  const pegarDados = async (nomeDoAlbum) => {
    if (!nomeDoAlbum) {
      console.warn('Campo de busca vazio. Nenhuma requisição será feita.');
      return;
    }

    try {
      const response = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(nomeDoAlbum)}&api_key=b19cdb5c459071ba668d0ef3d15e4e9d&format=json`
      );
      
      const albums = response.data.results.albummatches.album;
      setAlbum(albums);
      setFiltro(albums);
    } catch (error) {
      console.error('Erro ao buscar os dados da API:', error);
    }
  };

  const filtrar = () => {
    const data = filtro.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setAlbum(data);
  };

  useEffect(() => {
    pegarDados(input); 
  }, [input]); 

  return (
    <>
      <header className='Header'>
        <img className='foto' src='https://static.vecteezy.com/system/resources/previews/000/627/703/large_2x/vector-home-icon-symbol-sign.jpg' alt='Home' />
        <input
          className='barra'
          placeholder='Buscar álbum'
          value={input}
          onChange={(e) => setInput(e.target.value)} 
        />
        <div className='botao' onClick={filtrar}>
          Buscar
        </div>
      </header>
      <div className='album-list'>
        {album?.map((item, index) => (
          <Link className='album-item' key={index} to={`/musicas/${item.mbid}`}>
            <div className='album-content'>
              <img
                className='album-img'
                src={item.image?.[2]['#text'] || 'https://via.placeholder.com/150'}
                alt={item.name}
              />
              <div className='album-info'>
                <p className='album-name'>{item.name}</p>
                <p className='album-artist'>{item.artist}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default App;
