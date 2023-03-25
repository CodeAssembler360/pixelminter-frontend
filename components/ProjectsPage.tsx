import React from "react";
import Link from "next/link";
import styled from "styled-components";
import PageHeader from "components/PageHeader";
import { Container, Button } from "components/elements";

type CardImageComponentProps = {
  sprite: string;
  count: number;
};

const CardImageComponent: React.FC<CardImageComponentProps> = ({
  sprite,
  count,
}) => {
  const [hover, setHover] = React.useState(false);

  React.useEffect(() => {}, [hover]);

  return (
    <CardImage
      image={sprite}
      steps={count}
      hover={hover}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export type ProjectListItemProps = {
  id: string | number;
  title: string;
  sprite: string;
  total: number;
};

type Props = {
  projects?: any[];
};

const ProjectsPage: React.FC<Props> = ({ projects }) => {
  return (
    <Root>
      <PageHeader title="Projects">
        <Link href="/new" passHref>
          <a>
            <Button startIcon="plus">Create A New NFT Collection</Button>
          </a>
        </Link>
      </PageHeader>
      <Container>
        {projects && projects.length > 0 ? (
          <List>
            {projects.map((item: ProjectListItemProps) => (
              <Card key={item.id}>
                <CardImageComponent sprite={item.sprite} count={4} />
                <CardText>
                  <CardTitle>{item.title}</CardTitle> ({item.total})
                </CardText>
              </Card>
            ))}
          </List>
        ) : (
          <Start>
            <StartTitle>Create A Project</StartTitle>
            <StartText>
              You have no projects yet, create one to get started
            </StartText>
          </Start>
        )}
      </Container>
    </Root>
  );
};

export default ProjectsPage;

const Root = styled.div`
  padding-bottom: 45px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: calc(25% - 16px);
  margin-right: 21px;
  margin-bottom: 21px;

  &:nth-child(4n),
  &:last-child {
    margin-right: 0;
  }
`;

const CardImage = styled.div<{ image: string; steps: number; hover: boolean }>`
  background: url(${({ image }) => image});
  background-size: auto 100%;
  background-position: 0 0;
  background-color: #ecf2fd;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  animation: play ${({ steps }) => steps * 0.3}s steps(${({ steps }) => steps})
    infinite;
  animation-play-state: ${({ hover }) => (hover ? "running" : "paused")};
`;

const CardText = styled.div`
  text-align: center;
`;

const CardTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const Start = styled.div`
  max-width: 600px;
  background: #ecf2fd;
  margin: 0 auto;
  border-radius: 10px;
  padding: 58px 0;
  text-align: center;
`;

const StartTitle = styled.div`
  font-size: 33px;
  font-weight: 700;
  margin-bottom: 22px;
`;

const StartText = styled.div``;
