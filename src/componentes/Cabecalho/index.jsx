import { styled } from "styled-components"
import CampoTexto from "../CampoTexto"

const HeaderEstilizado = styled.header`
    padding: 60px 0;
    display: flex;
    justify-content: space-between;
    img {
        max-width: 212px;
    }
`

const Cabecalho = ({busca, onSearchChange, onSearchClick}) => {
    return (<HeaderEstilizado>
        <img src="/imagens/logo.png" alt="" />
        <CampoTexto
            value={busca}
            onChange={(e) => onSearchChange(e.target.value)}
            onClick={onSearchClick}
            placeholder="Buscar por título ou tag..."
        />
    </HeaderEstilizado>)
}

export default Cabecalho