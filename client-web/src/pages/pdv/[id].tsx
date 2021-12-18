import {
    Flex,
    Box,
    Divider,
    Heading,
    VStack,
    SimpleGrid,
    HStack,
    Button,
    Select,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Checkbox,
    useBreakpointValue,
    Text,
    Icon
} from '@chakra-ui/react'
import Link from 'next/link'
import {InputForm} from '../../components/Form/Input'
import { Spinner } from '@chakra-ui/spinner'
import { Logo } from '../../components/Header/Logo'
import { Header } from '../../components/Header'
import { SubmitHandler, useForm } from 'react-hook-form'
import NextLink from 'next/link' 
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useUsers } from '../../services/hooks/useUsers'
import { RiCloseLine } from 'react-icons/ri'
import { Pagination } from '../../components/Pagination'

type HomeProps = {
  email: string;
  password: string;
}

const signInFormShema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Infome uma senha')
})

export default function VendaAberta() {
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
     <Box>
      <Header />
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      
    <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center"> 
              <Heading size="lg" fontWeight="normal">
                Nome do cliente

                {!isLoading && isFetching && (
                  <Spinner size="sm" color="gray.500" ml="4" />
                )}

              </Heading>
              <NextLink href="/pdv" passHref> 
              <Button 
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="red"
                  leftIcon={<Icon as={RiCloseLine} fontSize="20" />}
                >
                  Cancelar
                </Button>
              </NextLink>
            </Flex>
            { isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
              ) : error ? (
                <Flex justify="center"> 
                  <Text>Falha ao obter dados da compra.</Text>
                </Flex>
              ) : (
                <>
                <SimpleGrid minChildWidth="240px"
                            spacing={
                                ["6", "8"]
                            }
                            w="100%">
                            <Select placeholder='Item'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <Select placeholder='Tamanho'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px"
                            spacing={
                                ["6", "8"]
                            }
                            w="100%">
                            <InputForm name="barcode" type="text" label="Codigo de barras" autoFocus/>
                            <InputForm name="quantity" label="Quantidade" type="number"/>
                            <InputForm name="discount" label="Desconto" type="number"/>
                            <Flex mt="8" >
                                <Button type="submit" colorScheme="blue"
                                    isLoading={
                                        formState.isSubmitting
                                }>
                                    Adicionar
                                </Button>
                            </Flex>
                        </SimpleGrid>
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
                              <Link href="#">
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
                  <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/pdv" passHref>
                                <Button as="a" colorScheme="teal">
                                    Salvar e voltar
                                </Button>
                            </Link>
                            <Button type="submit" colorScheme="pink"
                                isLoading={
                                    formState.isSubmitting
                            }>
                                Finalizar
                            </Button>
                        </HStack>
                    </Flex>
                </>
              )
            }
            </Box>
          </Flex>
          </Box>
    </>
    
  )
}
