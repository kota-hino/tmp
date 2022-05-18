import styled from 'styled-components';

import Btn from '../atoms/Btn';

const ReturnBoxWrap = styled.div`
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
    padding: 10px 0;
`;
const FileUp = styled.input`
    padding: 0 0 20px;
    font-size: 14px;
    color: #90A2FF;
`;

const SelectBox = styled.select`
    padding: 5px 15px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    color: #000;
    outline: none;
    background-color: #E8E8E8;
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const FlexWrap = styled.div`
    padding: 0 0 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const SubTitle = styled.h3`
    font-size: 15px;
    color: #90A2FF;
`;

const ReturnBox = (props) => {
    return(
        <ReturnBoxWrap>
            <Title>返却登録&ensp;<TitleSpan>書籍以外</TitleSpan></Title>

            <FlexWrap>
                { props.lendingPhotoArr }
            </FlexWrap>

            <Flex>
                <SubTitle>返却する記録</SubTitle>
                <SelectBox onChange={props.getSelectId}>
                    <option>貸出記録ID</option>
                    { props.optionArr }
                </SelectBox>
            </Flex>

            <FileUpWrap>
                <FileUp type="file" id='returnFile' />

                <Btn text="返却登録" width="100%" clickedFn={props.clickedFn} />
            </FileUpWrap>
        </ReturnBoxWrap>
    );
}
export default ReturnBox;