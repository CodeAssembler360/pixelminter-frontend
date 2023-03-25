import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import PageHeader from "components/PageHeader";
import { Container, Button } from "components/elements";

type Props = {};

const ProjectPage: React.FC<Props> = () => {
  const router = useRouter();

  return (
    <Root>
      <PageHeader title="Projects">
        <Button startIcon="plus"> Create A New NFT Collection</Button>
      </PageHeader>
      <Container>
        <Text>
          <Title>Image</Title> (100 items)
        </Text>
        <List>
          {[...Array(30)].map((item, index) => (
            <Card key={index}>
              <CardImage
                src={`/images/item-example-${
                  (index + 1) % 5 === 0 ? 5 : (index + 1) % 5
                }.png`}
              />
              <CardText>
                <CardTitle>Image {index + 1}</CardTitle>
              </CardText>
            </Card>
          ))}
        </List>
        <ListFooter>
          <Button>Load more</Button>
        </ListFooter>
      </Container>
    </Root>
  );
};

export default ProjectPage;

const Root = styled.div`
  padding-bottom: 45px;
`;

const Text = styled.div`
  margin-bottom: 36px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: calc(20% - 10px);
  margin-right: 12px;
  margin-bottom: 12px;

  &:nth-child(5n),
  &:last-child {
    margin-right: 0;
  }
`;

const CardImage = styled.div<{ src: string }>`
  width: 100%;
  padding-bottom: 100%;
  padding-bottom: 92%;
  height: 0;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: url(${({ src }) => src}) no-repeat 50%;
  background-size: cover;
  background-color: #ecf2fd;
`;

const CardText = styled.div`
  background: #f2f4f4;
  text-align: center;
  padding: 4px 10px 8px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const CardTitle = styled.span`
  font-size: 9px;
  font-weight: 700;
`;

const ListFooter = styled.div`
  text-align: center;
  margin-top: 38px;
`;
