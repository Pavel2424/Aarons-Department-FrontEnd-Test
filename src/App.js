import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (pageNum) => {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?page=${pageNum}&action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=pizzas&json=true`
    );
    const data = await res.json();
    setNumberOfProducts(data.count);
    setProducts(data.products);
    refreshPageNumber();
    console.log(data);
    return data.products;
  };

  const changeToNextPage = () => {
    changeToPage(currentPage + 1);
  };

  const changeToPreviousPage = () => {
    if (currentPage < 1) {
      setCurrentPage(1);
    }
    changeToPage(currentPage - 1);
  };

  const changeToPage = (pageNum) => {
    setProducts([]);
    setCurrentPage(pageNum);
    // fetchData(pageNum)
    refreshPageNumber();
  };

  const changeToFirstPage = () => {
    changeToPage(1);
  };

  const changeToLastPage = () => {
    let lastPage = Math.ceil(numberOfProducts / 24);
    changeToPage(lastPage);
  };

  const refreshPageNumber = () => {
    let lastPage = Math.ceil(numberOfProducts / 24);
    if (currentPage === 1) {
      setPageNumbers([currentPage, currentPage + 1, currentPage + 2]);
    } else if (currentPage === lastPage) {
      setPageNumbers([currentPage - 2, currentPage - 1, currentPage]);
    } else {
      setPageNumbers([currentPage - 1, currentPage, currentPage + 1]);
    }
  };
  return (
    <Container fluid>
      <Router>
        <Switch>
          <Route exact path="/">
            <Row>
              {products.length > 0 ? (
                products.map((product) => (
                  <Col key={product.id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={product.image_url}
                        height="250"
                      />
                      <Card.Body>
                        <Card.Title>{product.product_name}</Card.Title>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>{product.brands}</ListGroupItem>
                        <ListGroupItem>{product.countries}</ListGroupItem>
                      </ListGroup>
                      <Card.Body>
                        <Link to={`/details/${product.id}`}>
                          <Button variant="primary">Details</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <div
                  style={{
                    margin: "auto",
                    marginTop: "20%",
                    textAlign: "center",
                    width: "15%",
                  }}
                >
                  <h2>Loading...</h2>
                </div>
              )}
            </Row>
            <Row>
              {products.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    disabled={currentPage === 1}
                    variant="primary"
                    onClick={changeToFirstPage}
                  >
                    First
                  </Button>
                  <Button
                    disabled={currentPage === 1}
                    variant="primary"
                    onClick={changeToPreviousPage}
                  >
                    Prev
                  </Button>
                  {pageNumbers.map((value, index) => (
                    <Button onClick={() => changeToPage(value)} key={index}>
                      {value}
                    </Button>
                  ))}
                  <Button
                    disabled={currentPage === Math.ceil(numberOfProducts / 24)}
                    variant="primary"
                    onClick={changeToNextPage}
                  >
                    Next
                  </Button>
                  <Button
                    disabled={currentPage === Math.ceil(numberOfProducts / 24)}
                    variant="primary"
                    onClick={changeToLastPage}
                  >
                    Last
                  </Button>
                </div>
              ) : (
                ""
              )}
            </Row>
          </Route>
          <Route path="/details/:id">
            <ProductDetails products={products} />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
