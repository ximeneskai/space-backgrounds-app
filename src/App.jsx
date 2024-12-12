import { styled } from "styled-components"
import EstilosGlobais from "./componentes/EstilosGlobais"
import Cabecalho from "./componentes/Cabecalho"
import BarraLateral from "./componentes/BarraLateral"
import Banner from "./componentes/Banner"
import bannerBackground from './assets/banner.png'
import Galeria from "./componentes/Galeria"

import fotos from './fotos.json'
import { useState } from "react"
import ModalZoom from "./componentes/ModalZoom"


const FundoGradiente = styled.div`
  background: linear-gradient(174.61deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
  width: 100%;
  min-height: 100vh;
`

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`

const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`

const ConteudoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const App = () => {
  const [fotosOriginais, setFotosOriginais] = useState(fotos)
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos)
  const [fotoSelecionada, setFotoSelecionada] = useState(null)
  const [busca, setBusca] = useState(""); 

  const aoAlternarFavorito = (foto) => {

    const fotosAtualizadas = fotosOriginais.map((fotoOriginal) => {
      if (fotoOriginal.id === foto.id) {
        return {...fotoOriginal, favorita: !foto.favorita};
      }
      return fotoOriginal;
    });
    
    setFotosOriginais(fotosAtualizadas);

    const fotosFiltradasAtualizadas = fotosDaGaleria.map((fotoDaGaleria) => {
      if (fotoDaGaleria.id === foto.id) {
        return { ...fotoDaGaleria, favorita: !foto.favorita};
      }
      return fotoDaGaleria;
    })

    setFotosDaGaleria(fotosFiltradasAtualizadas);
    
  }

  const filtrarPorTag = (tagId) => {
    if (tagId === 0) {
      setFotosDaGaleria(fotosOriginais);
      return
    }

    const fotosFiltradas = fotosOriginais.filter(
      (foto) => foto.tagId === tagId);
      setFotosDaGaleria(fotosFiltradas);
  }

  const pesquisarFotos = () => {
    const pesquisa = busca.toLowerCase().trim();

    if(!pesquisa) {
      setFotosDaGaleria(fotosOriginais);
      return;
    }

    const fotosFiltradas = fotosOriginais.filter(
      (foto) => 
        foto.titulo.toLowerCase().includes(pesquisa) ||
        (!isNaN(pesquisa) && foto.tagId === parseInt(pesquisa))
    );

    setFotosDaGaleria(fotosFiltradas);
  }
  
  return (
    <FundoGradiente>
      <EstilosGlobais />
      <AppContainer>
        
        <Cabecalho
          busca={busca} 
          onSearchChange={setBusca} 
          onSearchClick={pesquisarFotos}
        />
        <MainContainer>
          <BarraLateral />
          <ConteudoGaleria>
            <Banner
              texto="A galeria mais completa de fotos do espaço!"
              backgroundImage={bannerBackground}
            />
            <Galeria 
              aoFotoSelecionada={foto => setFotoSelecionada(foto)}
              aoAlternarFavorito={aoAlternarFavorito} 
              fotos={fotosDaGaleria}
              onTagClick={filtrarPorTag}
            />
          </ConteudoGaleria>
        </MainContainer>
      </AppContainer>
      <ModalZoom 
        foto={fotoSelecionada}
        aoFechar={() => setFotoSelecionada(null)}
        aoAlternarFavorito={aoAlternarFavorito}
      />
    </FundoGradiente>
  )
}

export default App
