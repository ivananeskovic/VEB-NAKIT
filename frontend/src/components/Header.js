import React from 'react';
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaSignInAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { logout, selectIsAdminUser, selectUserInfo } from '../slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const isAdminUser = useSelector(selectIsAdminUser);
  const { cartItems } = useSelector((state) => state.cart);
  const { favoriteItems } = useSelector((state) => state.favorites);
  const userName = userInfo?.name
    ? userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)
    : '';
  const logoutUser = () => {
    dispatch(logout());
    toast.info('Uspesno ste se odjavili.');
    navigate('/');
  };

  return (
    <Navbar className="site-header" expand="lg" variant="dark">
      <Container className="header-content">
        <LinkContainer to="/">
          <Navbar.Brand className="brand">
          Jewelry Shop
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto main-nav">
            <LinkContainer to="/">
              <Nav.Link>Pocetna</Nav.Link>
            </LinkContainer>
            <Nav.Link href="/#favorites">
              <FaHeart /> Favoriti <Badge bg="light" text="dark">{favoriteItems.length}</Badge>
            </Nav.Link>
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart /> Korpa <Badge bg="light" text="dark">{cartItems.length}</Badge>
              </Nav.Link>
            </LinkContainer>
          {userInfo ? (
            <>
              {isAdminUser && (
                <LinkContainer to="/admin/productlist">
                  <Nav.Link>
                    <FaUser /> {userName}
                  </Nav.Link>
                </LinkContainer>
              )}
              {!isAdminUser && (
                <Nav.Link as="span">
                  <FaUser /> {userName}
                </Nav.Link>
              )}
              <Button className="nav-button" type="button" onClick={logoutUser}>
                Odjava
              </Button>
            </>
          ) : (
            <>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaSignInAlt /> Prijava
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Registracija</Nav.Link>
              </LinkContainer>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
