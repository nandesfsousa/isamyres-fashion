import { Link, Flex, Button, PinInput, PinInputField, HStack, Box, Heading, Spinner, Icon, Table, Thead, Tr, Th,  Tbody, Checkbox, Td, Text, useBreakpointValue } from '@chakra-ui/react'
import { Logo } from '../../components/Header/Logo'
import { Header } from '../../components/Header'
import { SubmitHandler, useForm } from 'react-hook-form'
import NextLink from 'next/link' 
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useUsers } from '../../services/hooks/useUsers'
import { RiAddLine } from 'react-icons/ri'
import { Pagination } from '../../components/Pagination'

type HomeProps = {
  email: string;
  password: string;
}

const signInFormShema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Infome uma senha')
})

export default function Pdv() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(0)
  const [logged, setLogged] = useState(true)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })


  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormShema)
  })
  const { errors } = formState

  const handleSingIn: SubmitHandler<HomeProps> = (values) => {
    console.log(values)
  }

  return (
    <>
    {
    logged ? 
    <Box>
      <Header />
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      
    <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center"> 
              <Heading size="lg" fontWeight="normal">
                Vendas abertas

                {!isLoading && isFetching && (
                  <Spinner size="sm" color="gray.500" ml="4" />
                )}

              </Heading>
              <NextLink href="/pdv/create" passHref> 
              <Button 
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Nova venda
                </Button>
              </NextLink>
            </Flex>
            { isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
              ) : error ? (
                <Flex justify="center"> 
                  <Text>Falha ao obter dados das compras em aberto.</Text>
                </Flex>
              ) : (
                <>
                  <Table colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th px={["4", "4", "6"]} color="gray.300" width="8">
                          <Checkbox  colorScheme="pink" />
                        </Th>
                        <Th>Cliente</Th>
                        { isWideVersion && <Th>Valor total</Th> }
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
                              <Link color="purple.400">
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
  :
  <Flex
    w="100vw"
    h="100vh"
    align="center"
    justify="center"
  >
    <Flex 
      as="form" 
      width="100%" 
      maxWidth={360}
      bg="gray.800"
      p="8"
      borderRadius={8}
      flexDir="column"
      onSubmit={handleSubmit(handleSingIn)}
    >
      <Logo />
      <HStack spacing="4">
        <PinInput>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        </PinInput>
      </HStack>
      <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>Entrar</Button>
    </Flex>
  </Flex>
    }
    </>
    
  )
}
