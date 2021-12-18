import {useRef} from "react";

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
    Icon,
    InputGroup,
    InputLeftElement,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import {Sidebar} from '../../components/Sidebar'
import {Header} from '../../components/Header'
import {InputForm} from '../../components/Form/Input'
import {SubmitHandler, useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import Link from 'next/link'
import {RiBarcodeBoxLine, RiAddLine} from 'react-icons/ri'

type CreateUserProps = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

type ProductProps = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const createUserSchema = yup.object().shape({
    name: yup.string().required('Digite um nome'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Infome uma senha').min(8, 'Minimo 8 caracteres'),
    password_confirmation: yup.string().oneOf(
        [
            null, yup.ref('password')
        ],
        'As senhas precisam ser iguais'
    )
})

export default function CreateSale() {
    const inputRef = useRef();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = useRef()

    const data = []

    const isWideVersion = useBreakpointValue({base: false, lg: true})

    const {register, handleSubmit, formState} = useForm({resolver: yupResolver(createUserSchema)})
    const {errors} = formState

    const handleCreateUser: SubmitHandler < CreateUserProps > = (values) => {
        console.log(values)
    }

    async function handlePrefetchItem(index : number) { /*
        await queryItem.prefetchQuery([
            'user', id
        ], async () => {
            const {data} = await api.get(`user/${id}`)

            return data
        }, {
            staleTime: 1000 * 60 * 10
        })
        */
        return ""
    }

    return (
        <Box>
            <Drawer isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}>
                <DrawerOverlay/>
                <DrawerContent bgColor="gray.800">
                    <DrawerCloseButton/>
                    <DrawerHeader>Cadastrar cliente</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing="8">
                            <InputForm name="name" type="text" label="Nome completo"/>
                            <InputForm name="cpf" type="text" label="CPF"/>
                            <InputForm name="niver" label="Data de nascimento" type="date"/>
                            <InputForm name="telefone" label="Telefone" type="text"/>
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline'
                            mr={3}
                            onClick={onClose}
                            colorScheme="whiteAlpha">
                            Cancelar
                        </Button>
                        <Button colorScheme='blue'>Cadastrar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Header/>
            <Flex w="100%" my="6"
                maxWidth={1480}
                mx="auto"
                px="6">

                <Box as="form" flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={
                        ["6", "8"]
                    }
                    onSubmit={
                        handleSubmit(handleCreateUser)
                }>
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Nova venda

                        </Heading>
                        <Button onClick={onOpen}
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            leftIcon={<Icon as={RiAddLine}
                            fontSize="20"/>}>
                            Cadastrar cliente
                        </Button>
                    </Flex>

                    <Divider my="6" borderColor="gray.700"/>
                    <VStack spacing="8">
                        <Select placeholder='Cliente'>
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </Select>

                        <Text>Adicionar itens</Text>
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

                        
                        <Divider/>
                    </VStack>

                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px={
                                        ["4", "4", "6"]
                                    }
                                    color="gray.300"
                                    width="8">
                                    <Checkbox colorScheme="pink"/>
                                </Th>
                                <Th>Produto</Th>
                                {
                                isWideVersion && <Th>Quantidade</Th>
                            }
                                <Th>Desconto</Th>
                                <Th>Preço</Th>
                                <Th>Subtotal</Th>
                                <Th width="8"></Th>
                            </Tr>
                        </Thead>
                        <Tbody> {
                            data.map((user) => (
                                <Tr key={
                                    user.id
                                }>
                                    <Td px={
                                            ["4", "4", "6"]
                                        }
                                        color="gray.300"
                                        width="8">
                                        <Checkbox colorScheme="pink"/>
                                    </Td>
                                    <Td>
                                        <Box>
                                            <Link href="#" passHref>
                                                <Text fontWeight="bold">
                                                    {
                                                    user.name
                                                }</Text>
                                            </Link>
                                            <Text fontSize="sm" color="gray.300">
                                                {
                                                user.email
                                            }</Text>
                                        </Box>
                                    </Td>
                                    {
                                    isWideVersion && <Td>{
                                        user.createdAt
                                    }</Td>
                                } </Tr>
                            ))
                        } </Tbody>
                    </Table>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/pdv" passHref>
                                <Button as="a" colorScheme="red">
                                    Cancelar
                                </Button>
                            </Link>
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
                </Box>
            </Flex>
        </Box>
    )
}
