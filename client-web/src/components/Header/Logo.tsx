import {Text} from '@chakra-ui/react'
import NextLink from 'next/link'
export function Logo() {
    return (
        <NextLink href="/dashboard" passHref>
            <Text fontSize={
                    ["2xl", "3xl"]
                }
                fontWeight="bold"
                letterSpacing="tight"
                w="64">
                Isamyres Fashion
                <Text as="span" ml="1" color="pink.500">.</Text>
            </Text>
        </NextLink>
    )
}
