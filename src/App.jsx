import { styled } from "styled-components"
import EstilosGlobais from "./componentes/EstilosGlobais"
import Cabecalho from "./componentes/Cabecalho"
import BarraLateral from "./componentes/BarraLateral"
import Banner from "./componentes/Banner"
import bannerBackground from './assets/banner.png'
import Galeria from "./componentes/Galeria"

import fotos from './fotos.json'
import { useEffect, useState } from "react"
import ModalZoom from "./componentes/ModalZoom"
import CampoTexto from "./componentes/CampoTexto"

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
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos)
  const [fotoSelecionada, setFotoSelecionada] = useState(null)
  const [busca, setBusca] = useState(""); // Termo de busca

  useEffect(() => {
    const termo = busca.toLowerCase().trim();
    const fotosFiltradas = fotos.filter(
      (foto) =>
        foto.titulo.toLowerCase().includes(termo) || // Filtra por título
        (termo && !isNaN(termo) && foto.tagId === parseInt(termo)) // Filtra por tagId
    );
    setFotosDaGaleria(fotosFiltradas.length > 0 ? fotosFiltradas : fotos);
  }, [busca]);
  

  const aoAlternarFavorito = (foto) => {
    if (foto.id === fotoSelecionada?.id) {
      setFotoSelecionada({
        ...fotoSelecionada,
        favorita: !fotoSelecionada.favorita
      })
    }
    setFotosDaGaleria(fotosDaGaleria.map(fotoDaGaleria => {
      return {
        ...fotoDaGaleria,
        favorita: fotoDaGaleria.id === foto.id ? !foto.favorita : fotoDaGaleria.favorita
      }
    }))
    
  }
  
  return (
    <FundoGradiente>
      <EstilosGlobais />
      <AppContainer>
        
        <Cabecalho />
        <CampoTexto
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por título ou tag..."
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
