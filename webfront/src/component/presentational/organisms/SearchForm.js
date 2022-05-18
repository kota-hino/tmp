import styled from 'styled-components';

import Btn from '../atoms/Btn';

const SearchFormBox = styled.div`
    padding: 20px 15px 15px;
    background-color: #E8E8E8;
    @media screen and (min-width:860px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;
const Input = styled.input`
    width: 100%;
    padding: 5px 10px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    outline: none;
    @media screen and (min-width:860px) {
        width: 50%;
    }
`;
const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0 0;
    @media screen and (min-width:860px) {
        display: block;
        padding: 0;
    }
`;
const SelectBox = styled.select`
    padding: 5px 15px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    color: #000;
    outline: none;
    cursor: pointer;
    @media screen and (min-width:860px) {
        margin: 0 15px;
    }
`;

const searchForm = (props) => {
    return(
        <SearchFormBox>
            <Input type='text' placeholder='検索' onChange={props.getInputName} />
            <Div>
                <SelectBox onChange={props.getSelectCate}>
                    <option value="">カテゴリー</option>
                    { props.optionArr }
                </SelectBox>

                <Btn text="検索" clickedFn={props.clickedFn} />
            </Div>
        </SearchFormBox>
    )
}
export default searchForm;