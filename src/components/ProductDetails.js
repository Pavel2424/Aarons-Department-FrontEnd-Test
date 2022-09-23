import { useParams } from "react-router";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const ProductDetails = ({ products }) => {
  let { id } = useParams();

  return (
    <Container>
      <h3>Product Details</h3>
      {products.map((product) =>
        product.id === id ? (
          <div key={product.id}>
            <h3>{product.product_name}</h3>
            <img src={product.image_url} alt="" />
            <ListGroup>
              <ListGroupItem>Countries: {product.countries}</ListGroupItem>
              <ListGroupItem>Brand: {product.brands}</ListGroupItem>
            </ListGroup>
            <Row>
              <Col xs={6}>
                <h4>Ingredients:</h4>
                <Card>
                  <Card.Img
                    variant="top"
                    src={product.image_ingredients_url}
                    height="100"
                    alt=""
                  />
                  <Card.Body>
                    <Card.Text>
                      {typeof product.ingredients_text_en === "undefined"
                        ? product.ingredients_text
                        : product.ingredients_text_en}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6}>
                <h4>Allergens:</h4>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      Substances or products causing allergies or intolerances:{" "}
                      {product.allergens}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )
      )}
    </Container>
  );
};

export default ProductDetails;
