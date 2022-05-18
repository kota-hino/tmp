import styled from 'styled-components';

const BackBox = styled.div`
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000;
    z-index: 1000;
    opacity: 0.4;
`;

const Back = () => {
    return(
        <BackBox id="back">
        </BackBox>
    );
}
export default Back;