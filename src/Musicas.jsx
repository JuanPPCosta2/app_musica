import { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

function Musicas() {
    const { id } = useParams(); 
    const [musicas, setMusicas] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [erro, setErro] = useState(null); 
    const navigate = useNavigate(); 

    const pegarDados = async () => {
        try {
          
            const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=b19cdb5c459071ba668d0ef3d15e4e9d&mbid=${id}&format=json`;

            const response = await axios.get(url);

            if (response.data && response.data.album) {
                const albumInfo = response.data.album;

                const arrumado = [{
                    nome: albumInfo.name,
                    artista: albumInfo.artist,
                    foto: albumInfo.image?.[2]['#text'] || '', 
                    tracks: albumInfo.tracks.track.map(track => track.name) 
                }];

                setMusicas(arrumado);
                setFiltro(arrumado);
                setErro(null); 
            } else {
                setErro("Dados do álbum não encontrados.");
            }
        } catch (error) {
            console.error("Erro ao buscar os dados da API:", error);
            setErro("Erro ao buscar os dados da API. Verifique se o álbum existe.");
        }
    };



    useEffect(() => {
        pegarDados();
    }, [id]); 

    return (
        <>
            <header className='Header'>
                <img className='foto' src="https://static.vecteezy.com/system/resources/previews/006/056/660/original/music-icon-music-tone-flat-symbol-design-isolated-on-white-background-free-vector.jpg" alt="musica" />
                <div className='Voltar' onClick={() => navigate('/')}> {}
                    Voltar
                </div>
            </header>
            <div className='pai'>
                {erro ? (
                    <p className="erro">{erro}</p>
                ) : (
                    musicas.map((item, index) => (
                        <div className='musicas' key={index}>
                            <img src={item.foto} alt={item.nome} />
                            <p className='nome'>{item.nome}</p>
                            <p className='artista'>{item.artista}</p>
                            <p className='genero'>{item.genero}</p>
                            <ul>
                                {item.tracks.map((track, i) => (
                                    <li key={i}>{track}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Musicas;
