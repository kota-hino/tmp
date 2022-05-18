import styled from 'styled-components';

const EquipmentBoxWrap = styled.div`
    padding: 10px;
    background-color: #FFF;
    text-align: center;
`;
const Img = styled.img`
    width: 160px;
`;
const Detail = styled.h3`
    margin: 0;
    padding: 15px 10px;
    font-size: 16px;
    color: #686868;
    word-break: break-all;
    text-align: left;
`;
const Number = styled.h3`
    margin: 0;
    padding: 0 0 15px;
    font-size: 16px;
    color: #90A2FF;
    text-align: left;
`

const LabName = styled.h3`
    margin: 0;
    padding: 0 0 15px;
    font-size: 16px;
    color: #90A2FF;
    text-align: left;
`;

const MaxWidth = styled.div`
    @media screen and (min-width:860px) {
        margin: 0 auto;
        max-width: 1260px;
    }
`;

const EquipmentBox = (props) => {
    const displayLabName = () => {
        if(props.labName) {
            return(
                <LabName>所持研究室&ensp;{props.labName}</LabName>
            )
        }
    }

    const displayImg = () => {
        if(props.contentImgPath) {
            return(
                <Img src={props.contentImgPath} />
            );
        } else {
            return(
                <Img src={`${process.env.PUBLIC_URL}/img/img.svg`} />
            );
        }
    }
 
    return(
        <EquipmentBoxWrap>
            <MaxWidth>
                <Number>登録番号&ensp;{props.number}</Number>
                { displayLabName() }
                { displayImg() }
                <Detail>{props.contentDetail}</Detail>
            </MaxWidth>
        </EquipmentBoxWrap>
    )
}
export default EquipmentBox;