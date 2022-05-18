import styled from 'styled-components';

import Btn from '../atoms/Btn';

const UserSearchFormBox = styled.div`
    background-color: #E8E8E8;
    padding: 20px 15px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (min-width:860px) {
        justify-content: flex-end;
    }
`;

const SelectBox = styled.select`
    padding: 5px 15px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    color: #000;
    outline: none;
    @media screen and (min-width:860px) {
        margin: 0 15px;
    }
`;

const UserSearchForm = (props) => {
    return(
        <UserSearchFormBox>
            <SelectBox onChange={props.getSelectName}>
                <option>ユーザー名</option>
                { props.optionArr }
            </SelectBox>
            <Btn text="検索" clickedFn={props.clickedFn} />
        </UserSearchFormBox>
    );
}
export default UserSearchForm;
