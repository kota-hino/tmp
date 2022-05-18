import axios from 'axios';
import styled from 'styled-components';

const ReturnBoxDetailWrap = styled.div`

`;
const Img = styled.img``;

const ReturnBoxDetail = (props) => {
    const lendingInfo = () => {
        axios
        .get("http://localhost:3000/api/v1/lendinglogphoto/lentitem/" + props.userId)
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
    }

    return(
        <ReturnBoxDetailWrap>
            { lendingInfo() }
        </ReturnBoxDetailWrap>
    );
}
export default ReturnBoxDetail;