import {Stack,  Badge} from '@chakra-ui/react'
import {
    RiStoreLine,
    RiFundsLine,
    RiTeamLine,
    RiGroupLine,
    RiBarChart2Line,
    RiTruckLine,
    RiFileList3Line,
    RiPercentLine,
    RiHandCoinLine
} from 'react-icons/ri'
import {NavSection} from './NavSection'
import {NavLink} from './NavLink'

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="GERAL">
                <NavLink icon={RiStoreLine}
                    href="/inventory">
                    Estoque
                </NavLink>
                <NavLink icon={RiFundsLine}
                    href="/sales">
                    Vendas
                </NavLink>
                <NavLink icon={RiGroupLine}
                    href="/customers">
                    Clientes
                </NavLink>
                <NavLink icon={RiTruckLine}
                    href="/provider">
                    Fornecedores
                </NavLink>
                <NavLink icon={RiPercentLine}
                    href="/financial">
                    Finanças
                </NavLink>
            </NavSection>
            <NavSection title="AUTOMAÇÃO">
                <NavLink icon={RiFileList3Line}
                    href="/purchase-orders">
                    Pedidos de compra
                </NavLink>
                <NavLink icon={RiBarChart2Line}
                    href="/reports-manager">
                    Relatórios gerenciais
                </NavLink>
                <NavLink icon={RiHandCoinLine}
                    href="/contability">
                    Contabilidade
                </NavLink>
            </NavSection>
            <NavSection title="CONFIGURAÇÕES">
                <NavLink icon={RiTeamLine}
                    href="/users">
                    Usuários e permissões
                </NavLink>
            </NavSection>
        </Stack>
    )
}
