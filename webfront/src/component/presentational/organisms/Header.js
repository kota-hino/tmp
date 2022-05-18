import styled from 'styled-components';

import MobileMenuIcon from '../atoms/MobileMenyIcon';
import PcMenu from '../atoms/PcMenu';

const HeaderBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #E8E8E8;
`;
const Title = styled.h1`
    margin: 0;
    padding: 0 15px;
    font-size: 16px;
    font-weight: normal;
    color: #90A2FF;
`;


const Header = (props) => {
    const openMenu = () => {
        document.querySelector('body').classList.toggle('open');
    }

    return(
        <HeaderBox>
            <Title>備品管理システム</Title>
            <MobileMenuIcon clickedFn={openMenu} />
            <PcMenu />
        </HeaderBox>
    );
}
export default Header;