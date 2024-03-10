import { Flex, Anchor, Text, Button } from "@mantine/core";
import { IconTrees } from "@tabler/icons-react";

const NotFoundPage = () => {
    return (
        <Flex direction='column' align='center' justify='center' h={560}>
            <Flex>
                <Text fw={600} size='64px'>404</Text>
                <IconTrees size={64} />
            </Flex>
            <Text size="xl">Seem like you're lost</Text>
            <Button variant='light' color='blue' mt={16}>
                <Anchor href='/'>
                    Go back home
                </Anchor>
            </Button>
        </Flex>
    );
}

export default NotFoundPage;