import styled from 'styled-components';

import Btn from "../atoms/Btn";

const LoginBoxWrap = styled.div`
    display: none;
    padding: 10px 15px;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1010;
    background-color: #FFF;
    transform: translate(-50%, -50%);

    @media screen and (min-width:860px) {
        max-width: 860px;
        border-radius: 5px;
    }
`;
const Title = styled.h3`
    padding: 0 0 20px;
    font-weight: 500;
    font-size: 16px;
    color: #90A2FF;
`;
const SubTitle = styled.h3`
    font-size: 14px;
    color: #000;
`;
const Input = styled.input`
    width: 100%;
    padding: 3px;
    margin-bottom: 15px;
    border: solid 1px #CCC;
    outline: none;
    font-size: 14px;
    border-radius: 5px;
`;
const BtnWrap = styled.div`
    padding: 0 0px 10px;
    text-align: center;
`;

const LoginBox = (props) => {
    return(
        <LoginBoxWrap id="loginBox">
            <Title>ログイン</Title>
            <SubTitle>ユーザー名</SubTitle>
            <Input type="text" placeholder='入力' id="userName" />
            <SubTitle>パスワード</SubTitle>
            <Input type="password" placeholder='入力' id="pwd" />

            <BtnWrap>
                <Btn text="ログイン" clickedFn={props.clickedFnLogin} width="100%" />
            </BtnWrap>
            <BtnWrap>
                <Btn text="ユーザー新規作成" clickedFn={props.clickedFnCreate} width="100%" />
            </BtnWrap>
        </LoginBoxWrap>
    );
}
export default LoginBox;