import styled from 'styled-components';

const UserInfoBox = styled.div`
    padding: 10px 15px;
    background-color: #E8E8E8;
`;
const Name = styled.h3`
    font-size: 16px;
    color: #90A2FF;
`;

const UserInfo = (props) => {
    return(
        <UserInfoBox>
            <Name>ログイン者&ensp;{ props.userName }</Name>
        </UserInfoBox>
    );
}
export default UserInfo;