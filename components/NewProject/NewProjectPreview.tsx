import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

type Props = {
  items: string[];
  onGoBack?: any;
  onReStart?: any;
  onSave?: any;
};

const NewProjectPreview: React.FC<Props> = ({
  items,
  onGoBack,
  onReStart,
  onSave,
}) => {
  const [itemsToShow, setItemsToShow] = React.useState(10);
  const [hasMore, setHasMore] = React.useState(items.length > 10);

  const handleLoadMoreClick = () => {
    setItemsToShow((x) => x + 10);
  };

  React.useEffect(() => {
    if (hasMore && items.length <= itemsToShow) setHasMore(false);
  }, [itemsToShow]);

  return (
    <Root>
      <Container>
        <div className="text-center d-lg-flex justify-content-between align-items-center mb-5">
          <Text className="mb-4">{items.length + " NFT Artwork"}</Text>
          <Header>
            {onGoBack && typeof onGoBack === "function" && (
                <Button className="rounded-pill mx-2" variant="light" onClick={onGoBack}>Back To Edit</Button>
            )}
            {onReStart && typeof onReStart === "function" && (
                <Button className="rounded-pill mx-2" onClick={onReStart}>Regenerate Images</Button>
            )}
            {onSave && typeof onSave === "function" && (
                <Button className="rounded-pill mx-2" onClick={() => onSave(items)}>Download Collection</Button>
            )}
            {/* <HeaderButton size="small">Add Collection to Blockchain</HeaderButton> */}
          </Header>
        </div>
        <Row>
          {items.slice(0, itemsToShow).map((item, index) => (
            <Col lg={3}>
              <Card key={`new-project-preview-item-${index}`}>
                <CardImage src={item} />
                <CardText>
                  <CardTitle>Image {index + 1}</CardTitle>
                </CardText>
              </Card>
            </Col>
          ))}
        </Row>
        <Footer>
          {hasMore && <Button className="rounded-pill" onClick={handleLoadMoreClick}>Load more</Button>}
        </Footer>
      </Container>
    </Root>
  );
};

export default NewProjectPreview;

const Root = styled.div``;

const Footer = styled.div`
  margin: 28px 0 40px;
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const HeaderButton = styled(Button)`
  margin-right: 12px;

  &:last-child {
    margin-right: 0;
  }
`;



const Card = styled.div`
  margin-bottom: 25px;
  background-color: #ecf2fd;
  border-radius: 10px;
  overflow: hidden;
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
`;

const CardText = styled.div`
  background: #f2f4f4;
  text-align: center;
  padding: 10px 10px;
`;

const CardTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #0F123D;
`;

const Text = styled.p`
  font-size: 16px;
  color: #FD576C;
`;
