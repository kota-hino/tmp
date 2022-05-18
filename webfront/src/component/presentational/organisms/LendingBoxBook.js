import styled from 'styled-components';

import Btn from '../atoms/Btn';

const LendingBoxBookWrap = styled.div`
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

const InputWrap = styled.div`
`;
const Input = styled.input`
    width: 100%;
    margin: 0 0 20px;
    padding: 5px 10px;
    border: none;
    background-color: #E8E8E8;
    outline: none;
    border-radius: 5px;
    font-size: 14px;
`;

const LendingBoxBook = (props) => {
    return(
        <LendingBoxBookWrap>
            <Title>貸出登録&ensp;<TitleSpan>書籍</TitleSpan></Title>

            <InputWrap>
                <Input type="number" id='lendingFileBook' placeholder="ISBN番号(登録番号)" />

                <Btn text="貸出登録" width="100%" clickedFn={props.clickedFn} />
            </InputWrap>
        </LendingBoxBookWrap>
    )
}
export default LendingBoxBook;