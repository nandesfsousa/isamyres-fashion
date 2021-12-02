import { Link, Spinner, Flex, Box, Heading, Button, Icon, Table, Thead, Tr, Th,  Tbody, Checkbox, Td, Text, useBreakpointValue } from '@chakra-ui/react'
import { RiAddLine } from 'react-icons/ri'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import NextLink from 'next/link' 
import { useUsers } from '../../services/hooks/useUsers'
import { useState } from 'react'
import { QueryClient } from 'react-query'
import { queryClient } from '../../services/queryClient'
import { api } from '../../services/api'

export default function UserList(){
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: number){
    await queryClient.prefetchQuery(['user', userId], async () => {
      const { data } = await api.get(`user/${userId}`)

      return data
    }, {
      staleTime: 1000 * 60 * 10
    })
  } 

  return(
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center"> 
              <Heading size="lg" fontWeight="normal">
                Estoque

                {!isLoading && isFetching && (
                  <Spinner size="sm" color="gray.500" ml="4" />
                )}

              </Heading>
              <NextLink href="/inventory/create" passHref> 
                <Button 
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Entrada
                </Button>
              </NextLink>
            </Flex>
            { isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
              ) : error ? (
                <Flex justify="center"> 
                  <Text>Falha ao obter dados do estoque.</Text>
                </Flex>
              ) : (
                <>
                  <Table colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th px={["4", "4", "6"]} color="gray.300" width="8">
                          <Checkbox  colorScheme="pink" />
                        </Th>
                        <Th>Produto</Th>
                        { isWideVersion && <Th>Data de entrada</Th> }
                        <Th width="8"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      { data.users.map((user) => (
                        <Tr key={user.id}>
                          <Td px={["4", "4", "6"]} color="gray.300" width="8">
                            <Checkbox  colorScheme="pink" />
                          </Td>
                          <Td>
                            <Box>
                              <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                <Text fontWeight="bold">{user.name}</Text>
                              </Link>
                              <Text fontSize="sm" color="gray.300">{user.email}</Text>
                            </Box>
                          </Td>
                          { isWideVersion && <Td>{user.createdAt}</Td> }
                        </Tr>
                      ))
                      }
                    </Tbody>
                  </Table>
                  <Pagination
                    totalCountOfRegisters={data.totalCount}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </>
              )
            }
          </Box>
      </Flex>
    </Box>
  )
}