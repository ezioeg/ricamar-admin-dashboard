import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SideNav, {
  // Toggle,
  // Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import ClickOutside from "./ClickOutside";

import firebase from "../../firebase"; //index

function Sidebar() {
  // console.log(user);
  // const user = firebase.auth.currentUser;
  const navigate = useNavigate();
  const [expanded, setExpand] = useState(false);

  return (
    <>
      <ClickOutside
        onClickOutside={() => {
          setExpand(false);
        }}
      >
        <SideNav
          style={{ backgroundColor: "rgb(59, 130, 246)" }}
          onSelect={(selected) => {
            if (selected === "logout") {
              firebase.auth.signOut();
              navigate("/");
            } else {
              navigate(selected);
            }
          }}
          expanded={expanded}
          onToggle={(expanded) => {
            setExpand(expanded);
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="/">
            {/* <NavItem eventKey="usuario">
            <NavText>
              <h1 className="">{user.email}</h1>
            </NavText>
          </NavItem> */}

            {/*item  1*/}
            <NavItem eventKey="/">
              <NavIcon>
                <i className="fa fa-sitemap" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Estructura Empresa</NavText>
            </NavItem>

            {/*item  2*/}
            <NavItem eventKey="estructuraDM">
              <NavIcon>
                <i className="fa fa-building" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Estructura DM</NavText>
              <NavItem eventKey="estructura-datos-maestros/materiales">
                <NavText>Materiales</NavText>
              </NavItem>
              <NavItem eventKey="estructura-datos-maestros/clientes">
                <NavText>Clientes</NavText>
              </NavItem>
              <NavItem eventKey="estructura-datos-maestros/pedidos">
                <NavText>Pedidos</NavText>
              </NavItem>
              <NavItem eventKey="estructura-datos-maestros/cobros">
                <NavText>Cobros</NavText>
              </NavItem>
            </NavItem>

            {/*item  3*/}
            <NavItem eventKey="datos-maestros">
              <NavIcon>
                <i className="fa fa-database" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Datos Maestros</NavText>
            </NavItem>

            {/*item  4*/}
            <NavItem eventKey="gestion-pedidos">
              <NavIcon>
                <i className="fa fa-truck" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Gestión de pedidos</NavText>
            </NavItem>

            {/*item  5*/}
            <NavItem eventKey="logout">
              <NavIcon>
                <i className="fa fa-sign-out" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Cerrar sesión</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </ClickOutside>
    </>
  );
}

export default Sidebar;
