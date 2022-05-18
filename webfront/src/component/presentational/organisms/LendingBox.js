import styled from 'styled-components';

import Btn from '../atoms/Btn';

const LendingBoxWrap = styled.div`
    padding: 10px 15px;
    text-align: center;
    background-color: #FFF;
    border-radius: 5px;
`;

const Title = styled.h2`
    padding: 0 0 10px;
    font-size: 16px;
    color: #90A2FF;
    text-align: left;
`;
const TitleSpan = styled.span`
    font-size: 14px;
`;

const FileUpWrap = styled.div`

`;
const FileUp = styled.input`
    padding: 0 0 20px;
    font-size: 14px;
    color: #90A2FF;
`;

const LendingBox = (props) => {
    return(
        <LendingBoxWrap>
            <Title>貸出登録&ensp;<TitleSpan>書籍以外</TitleSpan></Title>

            <FileUpWrap>
                <FileUp type="file" id='lendingFile' />

                <Btn text="貸出登録" width="100%" clickedFn={props.clickedFn} />
            </FileUpWrap>
        </LendingBoxWrap>
    );
}
export default LendingBox;