import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)`
       text-decoration: none;
         color:#fff;
`

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    position: sticky;
    top: 0;
    background: linear-gradient(to right,#fff,#95eaf0);
    z-index: 2;
    width: 100%;
    box-shadow: 0px 0px 10px 0px #bfbfbf;
`
export const NavTitle = styled.h1`
      color: orange;
      font-style: italic;
      font-size: 25px;
      font-weight: 600;
      
`

export const MenuBtn = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
    font-size: 30px;
    display: none;
    color: orange;
    @media (orientation:portrait) and (max-width:766px) {
         display: inline-block;
    }
`
export const MenuCard = styled.ul`
         display: none;
         position: fixed;
         top: 0;
         display: flex;
         z-index: 2;
         flex-direction: column;
         right: 0;
         padding: 10px 0px;
         width:40%;
         height: 100%;
         background-color: #222;
         animation: slide 1s;
         @media (orientation:portrait) and (max-width:766px) {
         display: inline-block;
         }
         @keyframes slide {
            0%{
                transform: translateX(100%);
            }
            100%{
                transform: translateX(0%);
            }
            
         }
`

export const MenuList = styled.ul`
      display: flex;
      flex-direction:column;
      padding: 0;
      margin: 2cm 0px;
      list-style: none;
          
      li{
        border-bottom:1px solid #888;
        padding: 6px 10px;
        color: lightblue;
        cursor: pointer;
      }
      li:nth-child(even){
        background: linear-gradient(#333,#444);
        color: white;
      }
      
`
export const Large = styled.ul`
      list-style-type: none;
      gap: 14px;
      align-items: center;
      display: none;

      @media (orientation:landscape),(min-width:766px) {
          display: flex;
      }

`
export const Modal = styled.div`
     padding: 2rem;
    min-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 30px;
    p{
      color: red;
    }


`