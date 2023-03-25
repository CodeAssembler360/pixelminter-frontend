import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import logo from "assets/svg/logo.svg";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { UserContext } from "context/UserContext";

type Props = {
  transparent?: boolean;
  background?: boolean;
};

const nav = [
  // {
  //   title: "My Collection",
  //   href: "/projects",
  //   userOnly: true,
  // },
  // {
  //   title: "My Profile",
  //   href: "/profile",
  //   userOnly: true,
  // },
  {
    title: "Guide",
    href: "/guide",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
];

const Header: React.FC<Props> = ({ transparent, background }) => {
  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  const { user, signOut } = useContext(UserContext);

  const checkScroll = () => setScroll(window.scrollY > 38);

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      className={"header position-fixed py-4 top-0 w-100"}
      style={{
        transition: "0.5s",
        zIndex: "999",
        backgroundColor: scroll ? "#0F123D" : "transparent",
      }}
    >
      {background === true ? <NavbarBg></NavbarBg> : ""}
      <Container>
        <Link href="/" passHref>
          <a>
            <LogoImage src={logo} />
          </a>
        </Link>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex gap-2 align-items-center ms-auto">
            {user && (
              <Link href="/collection">
                <NavLink>View Collections</NavLink>
              </Link>
            )}

            {nav.map((navItem, index) =>
              !navItem.userOnly || (navItem.userOnly && user) ? (
                <NavItem key={`header-nav-item-${index}`}>
                  <Link href={navItem.href}>
                    <a>
                      <NavLink active={router.pathname === navItem.href}>
                        {navItem.title}
                      </NavLink>
                    </a>
                  </Link>
                </NavItem>
              ) : (
                <React.Fragment key={`header-nav-item-${index}`} />
              )
            )}
            {user && <NavLink onClick={signOut}>Logout</NavLink>}
            {!user && (
              <Link href="/login">
                <ButtonTag>
                  <Button style={{ width: "120px" }} className="rounded-pill">
                    Login
                  </Button>
                </ButtonTag>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

const NavbarBg = styled.div`
  background-image: linear-gradient(
    180deg,
    #974e82 0%,
    #2c2b6a 50%,
    #1e2251 100%
  );
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
`;

const LogoImage = styled.img`
  display: block;
  width: 150px;
`;

const NavItem = styled.div``;

const NavLink = styled.div<{ active?: boolean }>`
  margin-right: 20px;
  font-size: 14px;
  color: ${({ active }) => (active ? "#ffffff" : "#dcdbdb")};
  cursor: pointer;
`;
const ButtonTag = styled.a`
  margin-right: 20px;
`;
