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
    Input,
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
import {RiFileListLine, RiAddLine} from 'react-icons/ri'

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

export default function CreatePurchaseOrder() {
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
                finalFocusRef={btnRef}
                >
                <DrawerOverlay/>
                <DrawerContent bgColor="gray.800">
                    <DrawerCloseButton/>
                    <DrawerHeader>Adicionar produto</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing="8">
                            <Select placeholder='Item'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <InputForm name="description" type="text" label="Descrição"/>
                            <Select placeholder='Tamanho'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <InputForm name="size" type="text" label="Tamanho"/>
                            <InputForm name="pucharse_price" type="number" label="Preço de compra"/>
                            <InputForm name="sale_price" label="Preço de venda" type="number"/>
                            <InputForm name="quantity" label="Quantidade" type="number"/>
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline'
                            mr={3}
                            onClick={onClose}
                            colorScheme="whiteAlpha">
                            Cancelar
                        </Button>
                        <Button colorScheme='blue'>Salvar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Header/>
            <Flex w="100%" my="6"
                maxWidth={1480}
                mx="auto"
                px="6">
                <Sidebar/>

                <Box as="form" flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={
                        ["6", "8"]
                    }
                    onSubmit={
                        handleSubmit(handleCreateUser)
                }>
                    <Heading size="lg" fontWeight="normal">Novo pedido de compra</Heading>

                    <Divider my="6" borderColor="gray.700"/>
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px"
                            spacing={
                                ["6", "8"]
                            }
                            w="100%">
                            <Select placeholder='Fornecedor'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <Select placeholder='Proprietário'>
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
                            <InputGroup>
                                <InputLeftElement pointerEvents="none"><RiFileListLine/></InputLeftElement>
                                <input type='file' accept="pdf" name="purchase"
                                    ref={inputRef}
                                    style={
                                        {display: 'none'}
                                }></input>
                                <Input placeholder={"Carregar documento ..."}
                                    onClick={ ()=>{}
                                        //() => inputRef.current.click()
                                    }/>
                            </InputGroup>
                            <Button ref={btnRef}
                                leftIcon={<RiAddLine/>}
                                colorScheme='teal'
                                onClick={onOpen}>
                                Adicionar manualmente
                            </Button>
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
                                isWideVersion && <Th>Preço de Compra</Th>
                            }
                                <Th>Quantidade</Th>
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
                            <Link href="/inventory" passHref>
                                <Button as="a" colorScheme="whiteAlpha">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" colorScheme="pink"
                                isLoading={
                                    formState.isSubmitting
                            }>
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}
