
import { IoMdMenu, IoMdClose } from "react-icons/io";

import weblogo from '../../assets/weblogo.png'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Cookies from 'js-cookie'
import { Nav, MenuBtn, MenuCard, Large, Modal, MenuList, NavTitle, StyledLink } from './styles'
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../Context";

const subClass = {
    background: "red",
    borderRadius: "50%",
    padding: "5px",
    color: "#ffff"
}

const Navbar = () => {
    const [showMenu, togglemenu] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('jwt_token')
        navigate('/login')
    }

    const { cartList } = useContext(CartContext);

    return (<Nav>

        <StyledLink style={{ background: "transparent", border: "none" }} to={"/"}>
            <div className="d-flex align-items-center">
                <img src={weblogo} alt="weblogo" />
                <NavTitle>Tasty Kitchen</NavTitle>
            </div>
        </StyledLink>

        <MenuBtn onClick={() => togglemenu(!showMenu)}>
            <IoMdMenu />
        </MenuBtn>
        <Large>
            <li><StyledLink style={{ color: "#222" }} to={"/"}>Home</StyledLink></li>
            <li><StyledLink style={{ color: "#222" }} to={"/about"}>About</StyledLink></li>
            <li><StyledLink style={{ color: "#222" }} to={"/cart"}>Cart{cartList.length > 0 && <sup style={subClass}>{cartList.length}</sup>}</StyledLink></li>
            <Popup
                trigger={<button className="btn btn-danger" type="button">Logout</button>}
                modal
                nested>
                {close => (
                    <Modal >
                        <p>Are you sure to logging out!!!!</p>
                        <div className="d-flex gap-3">
                            <button type="button" onClick={() => close()} className="btn btn-outline-dark">close</button>
                            <button type="button" onClick={handleLogout} className="btn btn-danger">Confirm</button>
                        </div>
                    </Modal>
                )}
            </Popup>
        </Large>

        {
            showMenu &&
            <MenuCard>
                <MenuBtn onClick={() => togglemenu(!showMenu)} style={{ color: "red", position: "absolute", right: "20px", fontSize: "20px" }}>
                    <IoMdClose />
                </MenuBtn>
                <MenuList>
                    <li><StyledLink to={"/"}>Home</StyledLink></li>
                    <li><StyledLink to={"/about"}>About</StyledLink></li>
                    <li><StyledLink to={"/cart"}>Cart {cartList.length > 0 && <sup style={{ background: "red", padding: "3px", borderRadius: "50%" }}>{cartList.length}</sup>}</StyledLink></li>
                    <Popup
                        width="70%"
                        trigger={<button className="btn btn-danger mt-3" type="button">Logout</button>}
                        modal
                        nested>
                        {close => (
                            <Modal >
                                <p>Are you sure to logging out!!!!</p>
                                <div className="d-flex gap-3">
                                    <button type="button" onClick={() => close()} className="btn btn-outline-dark">close</button>
                                    <button type="button" onClick={handleLogout} className="btn btn-danger">Confirm</button>
                                </div>
                            </Modal>
                        )}
                    </Popup>

                </MenuList>
            </MenuCard>
        }

    </Nav >)
}

export default Navbar