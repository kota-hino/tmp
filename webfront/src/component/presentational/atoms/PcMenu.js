import styled from 'styled-components';

const PcMenuBox = styled.div`
    display: flex;
    padding: 10px 0;
    @media screen and (max-width:860px) {
        display: none;
    }
`;
const Text = styled.h3`
    margin: 0;
    padding: 0 15px;
    font-size: 16px;
    color: #90A2FF;
    cursor: pointer;
    &:hover {
        color: #e56767;
    }
`;

const PcMenu = () => {
    return(
        <PcMenuBox>
            <a href='/'><Text>備品一覧</Text></a>
            <a href='/lendingreturning'><Text>貸出・返却</Text></a>
            <a href='/lendinglog'><Text>貸出記録</Text></a>
        </PcMenuBox>
    );
}
export default PcMenu;