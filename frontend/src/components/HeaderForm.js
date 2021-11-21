import styled from 'styled-components';
import { FcStart } from 'react-icons/fc'
import { FcSearch } from 'react-icons/fc'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react';
import ModalsContainer from '../containers/ModalsContainer';

const HeaderFormBlock = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    padding: 8px 12px;
    svg{
            padding-top: 0.5rem;
        }
    .header_logo{
        
        a{
        font-size: 40px;
        }
    }
    a{
        text-decoration: none;
        color: #C0C0C0;
        font-size: 15px;
        display: table-cell; 
        vertical-align: middle
    }

    .header_search{
        background-color: #E0E0E0;
        border-radius: 3px;
        width: 40rem;

        .header_search_input{
        outline: none;
        border: none;
        border-radius: 3px;
        background-color: #E0E0E0;
        padding: 8px 12px;
        width: 93%;
        }
    }

    .header_button{
        text-decoration: none;
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        li{
            padding: 10px;
            cursor: pointer;
            color: #A0A0A0;
            &:hover{
                background-color: #d49466;
                border-radius: 4px;
        }
        }
    }
    .nav_toggle_btn{
        display: none;
        position: absolute;
        right: 32px;
        font-size: 24px;
        margin-top: 0.5rem;
    }
    @media screen and (max-width:880px){
        flex-direction: column;
        align-items: flex-start;
        padding:  8px 24px;
        .header_search{
            display:${toggle => toggle.toggle === true ? 'flex' : 'none'};
            text-align: center;
            width: 100%;
            svg{
                width: 20%;
            }
            input{
                width: 80%;
                
            }
        }
        .header_button{
            display:${toggle => toggle.toggle === true ? 'flex' : 'none'};
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
        }

        .nav_toggle_btn{
            display: block;
        }
}
`


const HeaderForm = () => {
    const [toggle, setToggle] = useState(false);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState("");

    const onToggle = () => {
        setToggle(!toggle);
    }

    const openModal = (type) => {
        setVisible(true)
        setType(type)
    }

    const closeModal = () => {
        setVisible(false)
    }


    return (
        <>
            <HeaderFormBlock toggle={toggle}>
                <div className="header_logo">
                    <a href="/"><FcStart></FcStart></a>
                </div>

                <div className="header_search">
                    <FcSearch /><input className="header_search_input" type="text" placeholder="검색어를 입력해주세요"></input>
                </div>

                <ul className="header_button">
                    <li onClick={() => openModal('login')}>로그인</li>
                    <li onClick={() => openModal('register')}>회원가입</li>
                </ul>
                <a className='nav_toggle_btn' href="#" onClick={onToggle}><GiHamburgerMenu /></a>
            </HeaderFormBlock>
            <ModalsContainer visible={visible} type={type} closeModal={closeModal}></ModalsContainer>
        </>
    );
};


export default HeaderForm;