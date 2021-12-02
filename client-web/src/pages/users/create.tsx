import { Flex, Box, Divider, Heading, VStack, SimpleGrid, HStack, Button} from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { InputForm } from '../../components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'


type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserSchema = yup.object().shape({
  name: yup.string().required('Digite um nome'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Infome uma senha').min(8, 'Minimo 8 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

export default function CreateUser(){
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserSchema)
  })
  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserProps> = (values) => {
    console.log(values)
  }

  return(
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6","8"]} onSubmit={handleSubmit(handleCreateUser)}>
            <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                <InputForm name="name" label="Nome completo" error={errors.name} {...register('name')} />
                <InputForm name="email" label="E-mail" type="email" error={errors.email} {...register('email')} />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                <InputForm name="password" type="password" label="Senha" error={errors.password} {...register('password')} />
                <InputForm name="password_confirmation" label="Repita a senha" type="password" error={errors.password_confirmation} {...register('password_confirmation')} />
              </SimpleGrid>
            </VStack>
            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
      </Flex>
    </Box>
  )
}