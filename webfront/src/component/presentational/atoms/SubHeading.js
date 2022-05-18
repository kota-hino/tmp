import styled from 'styled-components';

const SubHeadingBox = styled.h2`
    margin: 20px 15px 20px 0;
    padding: 10px 15px;
    font-size: 15px;
    color: #90A2FF;
    background-color: #FFF;
    border-radius: 0 5px 5px 0;
    @media screen and (min-width:860px) {
        margin: 20px 0;
        text-align: center;
        border-radius: 0;
    }
`;

const SubHeading = (props) => {
    return(
        <SubHeadingBox>
            {props.text}
        </SubHeadingBox>
    );
}
export default SubHeading;