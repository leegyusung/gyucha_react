import Modal from 'react-awesome-modal'
import styled, { css } from 'styled-components';


const AuthFormBlock = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 1rem;
    margin-right: 1rem;
`
const StyledInput = styled.input`
    margin-bottom: 1rem;
    width: 100%;
    border: none;
    border-radius: 4px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    background-color: #E0E0E0;
    outline: none;
`

const StyledButton = styled.button`
    margin-bottom: 1rem;
    width: 100%;
    border: none;
    border-radius: 2px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    ${props => props.cyan && css`
        background-color: #3bc9db;
    `}
    ${props => props.kakao && css`
        background-color: #FFFF00;
    `}
`
const StyledLink = styled.a`
    img{
        width: 100%;
        height: 40px;
    }
`

const textMap = {
    login: '로그인',
    register: '회원가입'
};

const Modals = ({ visible, type, form, closeModal, onChange, onSubmit }) => {

    return (
        <Modal
            visible={visible}
            width="400"
            height="320"
            effect="fadeInDown"
            onClickAway={closeModal}
        >
            <AuthForm form={form} type={type} onChange={onChange} onSubmit={onSubmit} ></AuthForm>
        </Modal>
    );
};

const AuthForm = ({ type, form, onChange, onSubmit }) => {
    const text = textMap[type];



    return (
        <AuthFormBlock>
            <h2>{text}</h2>
            <form onSubmit={onSubmit}>
                {type === 'register' ?
                    <>
                        <StyledInput type="text" name="username" placeholder="아이디" value={form.register.username} onChange={onChange}></StyledInput>
                        <StyledInput type="password" name="password" placeholder="비밀번호" value={form.register.password} onChange={onChange}></StyledInput>
                        <StyledInput type="password" name="passwordConfirm" placeholder="비밀번호 확인" value={form.register.passwordConfirm} onChange={onChange}></StyledInput>
                    </> : <>
                        <StyledInput type="text" name="username" placeholder="아이디" value={form.login.username} onChange={onChange}></StyledInput>
                        <StyledInput type="password" name="password" placeholder="비밀번호" value={form.login.password} onChange={onChange}></StyledInput>
                    </>}
                {type === 'register' ? <>
                    <StyledButton cyan>회원가입</StyledButton>
                </> :
                    <>
                        <StyledButton cyan>로그인</StyledButton>

                    </>}
            </form>
            {type === 'login' ?
                <>
                    <StyledLink href="http://localhost:4000/api/auth/kakao"><img alt="kakao" src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"></img></StyledLink>
                </> :
                <></>
            }

        </AuthFormBlock>
    );
};



export default Modals;