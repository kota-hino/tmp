import styled from 'styled-components';

const HeadingInfoBox = styled.div`
    padding: 10px 15px;
    background-color: #E8E8E8;
`;
const Text = styled.h3`
    margin: 0;
    font-size: 16px;
    color: #90A2FF;
`;

const HeadingInfo = (props) => {
    return(
        <HeadingInfoBox>
            <Text>{ props.text }</Text>
        </HeadingInfoBox>
    );
}
export default HeadingInfo;