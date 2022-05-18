import styled from 'styled-components';

const HalfSelectBoxWrap = styled.div`
    display: flex;
    padding-top: 15px;
    background-color: #E8E8E8;
`;
const Box = styled.div`
    width: 50%;
    padding: 5px 0;
    text-align: center;
    background-color: none;
    cursor: pointer;
    &:hover {
        opacity: .8;
    }

    &:first-child {
        border-right: solid 2px #90A2FF;
    }
`;

const HalfSelectBox = (props) => {
    const clickedBox = (e) => {
        if(e.target.id == "HalfSelectBox1") {
            document.querySelector("#HalfSelectBox1").classList.add("select");
            document.querySelector("#HalfSelectBox2").classList.remove("select");
        } else {
            document.querySelector("#HalfSelectBox2").classList.add("select");
            document.querySelector("#HalfSelectBox1").classList.remove("select");
        }
    }

    return(
        <HalfSelectBoxWrap>
            <Box id='HalfSelectBox1' onClick={clickedBox} className="select">
                { props.title1 }
            </Box>
            <Box id='HalfSelectBox2' onClick={clickedBox}>
                { props.title2 }
            </Box>
        </HalfSelectBoxWrap>
    );
}
export default HalfSelectBox;