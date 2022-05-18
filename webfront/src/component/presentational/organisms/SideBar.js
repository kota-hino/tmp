import styled from 'styled-components';

const TitleLog = styled.h2`
    position: absolute;
    top: 10px;
    left: 0px;
    margin: 0;
    padding: 0 15px;
    font-size: 14px;
    font-weight: normal;
    color: #FFF;
`;
const SideBarBox = styled.div`
    position: fixed;
    width: 0;
    height: 100%;
    padding: 120px 0 10px;
    background-color: #90A2FF;
    z-index: 1000;
    transition: all 0.4s;
    opacity: 0;
`;
const Text = styled.h3`
    width: 100%;
    margin: 0;
    padding: 15px 0;
    font-size: 18px;
    color: #FFF;
    text-align: center;
    border-bottom: 1px solid #687fc1;
`;

const SideBar = () => {
    return(
        <SideBarBox id='side-bar'>
            <TitleLog>備品管理システム</TitleLog>
            <a href='/'><Text>備品一覧</Text></a>
            <a href='/lendingreturning'><Text>貸出・返却</Text></a>
            <a href='/lendinglog'><Text>貸出記録</Text></a>
        </SideBarBox>
    );
}
export default SideBar;