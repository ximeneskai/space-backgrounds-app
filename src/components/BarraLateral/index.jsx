import styled from "styled-components"
import ItemNavegacao from "./ItemNavegacao"

const ListaEstilizada = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 121px;
`

const BarraLateral = () => {
    return (
        <aside>
            <nav>
                <ListaEstilizada>
                    <ItemNavegacao
                        iconeAtivo="/public/icones/home-ativo.png"
                        iconeInativo="/public/icones/home-inativo.png"
                        ativo={true}>
                            Início
                    </ItemNavegacao>
                    <ItemNavegacao
                        iconeAtivo="/public/icones/mais-vistas-ativo.png"
                        iconeInativo="/public/icones/mais-vistas-inativo.png"
                        ativo={false}>
                            Mais vistas
                    </ItemNavegacao>
                    <ItemNavegacao
                        iconeAtivo="/public/icones/mais-curtidas-ativo.png"
                        iconeInativo="/public/icones/mais-curtidas-inativo.png"
                        ativo={false}>
                            Mais curtidas
                    </ItemNavegacao>
                    <ItemNavegacao
                        iconeAtivo="/public/icones/novas-ativo.png"
                        iconeInativo="/public/icones/novas-inativo.png"
                        ativo={false}>
                            Novas
                    </ItemNavegacao>
                    <ItemNavegacao
                        iconeAtivo="/public/icones/surpreenda-me-ativo.png"
                        iconeInativo="/public/icones/surpreenda-me-inativo.png"
                        ativo={false}>
                            Surpreenda-me
                    </ItemNavegacao>
                    
                </ListaEstilizada>
            </nav>
        </aside>
    )
}

export default BarraLateral