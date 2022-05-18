// status 0=貸出可 1=貸出不可 2=貸出中

import styled from 'styled-components';

const ItemBoxWrap = styled.div`
    position: relative;
    margin: 0 0 10px 15px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    background-color: #FFF;
    border-radius: 5px 0px 0px 5px;
    @media screen and (min-width:860px) {
        width: 48%;
        margin: 0 0 10px 0;
        border-radius: 5px;
    }
`;
const Img = styled.img`
    width: 80px;
`;
const ContentTitle = styled.h3`
    margin: 0;
    padding: 0 15px;
    font-size: 15px;
    color: #90A2FF;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        color: #e56767;
    }
`;
let Circle;
const Status = styled.h4`
    position: absolute;
    bottom: 10px;
    right: 10px;
    margin: 0;
    font-size: 13px;
`;
let StatusSpan;

const Schedule = styled.span`
    color: #90A2FF;
`;

const Span = styled.span`
    color: #90A2FF;
    text-decoration: underline;
    cursor: pointer;
`;

const ImgWrap = styled.div`
    position: relative;
    cursor: pointer;
    &:hover {
        opacity: .8;
    }
`;
const IconZoom = styled.span`
    position: absolute;
    bottom: 0;
    right: 0;
`;

const ItemBox = (props) => {
    const displayCircle = () => {
        switch(props.status) {
            case 0:
                Circle = styled.div`
                    display: block;
                    width: 15px;
                    height: 15px;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: #8ADB88;
                    border-radius: 50%;
                `;
                break;
            case 1:
                Circle = styled.div`
                    display: block;
                    width: 15px;
                    height: 15px;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: #f9c464;
                    border-radius: 50%;
                `;
                break;
            case 2:
                Circle = styled.div`
                    display: block;
                    width: 15px;
                    height: 15px;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: #e56767;
                    border-radius: 50%;
                `;
                break;
        }
        return(
            <Circle></Circle>
        )
    }
    const displayStatus = () => {
        let statuText;
        switch(props.status) {
            case 0:
                statuText = "貸出可";
                StatusSpan = styled.span`
                    color: #8ADB88;
                `;
                break;
            case 1:
                statuText = "貸出不可";
                StatusSpan = styled.span`
                    color: #f9c464;
                `;
                break;
            case 2:
                statuText = "貸出中";
                StatusSpan = styled.span`
                    color: #e56767;
                `;
                break;
        }
        return(
            <StatusSpan>{ statuText }</StatusSpan>
        )
    }
    
    const displayImg = () => {
        if(props.contentImgPath) {
            return(
                <Img src={ props.contentImgPath } id={"equipmentImg-" + props.id} />
            )
        } else {
            return(
                <Img src={`${process.env.PUBLIC_URL}/img/img.svg`} id={"equipmentImg-" + props.id} />
            );
        }
    }

    const displayReturnSchedule = () => {
        if(props.returnSchedule) {
            const date = props.returnSchedule.substr(0, 10);
            return(
                <Schedule>{ date }</Schedule>
            )
        } else if(props.status == 2) {
            return(
                <Schedule><a href='/lendinglog'>確認</a></Schedule>
            )
        } else {
            return(
                <Schedule>---</Schedule>
            )
        }
    }

    const displayExtensionBtn = () => {
        if(props.returnSchedule && props.contentTitle.substr(0, 4) != "貸出記録") {
            return(
                <Span id={`lendinglogId-${props.lendingLog_id}`} onClick={props.extensionFn}>延長</Span>
            )
        } else if(props.returnSchedule) {
            return(
                <Span id={`lendingLogPhotoId-${props.lendingLog_id}`} onClick={props.extensionFn}>延長</Span>
            )
        }
    }

    const zoomImg = () => {
        // 画像を拡大表示
        const tgEquipment = document.querySelector("#equipmentImg-" + props.id);
        const tgIcon = document.querySelector("#icon-" + props.id);

        if(tgEquipment.style.width == "") {
            tgEquipment.style.width = "150px";
            tgIcon.innerHTML = "close_fullscreen";
        } else if(tgEquipment.style.width == "80px") {
            tgEquipment.style.width = "150px";
            tgIcon.innerHTML = "close_fullscreen";
        } else {
            tgEquipment.style.width = "80px";
            tgIcon.innerHTML = "zoom_out_map";
        }
    }

    return(
        <ItemBoxWrap>
            { displayCircle() }
            <ImgWrap onClick={zoomImg} >
                { displayImg() }
                <IconZoom className="material-icons" id={"icon-" + props.id}>zoom_out_map</IconZoom>
            </ImgWrap>

            <ContentTitle onClick={props.clickedFn} id={props.id}>{ props.contentTitle }</ContentTitle>
            <Status>{ displayStatus() }&ensp;&ensp;返却予定日&ensp;{ displayReturnSchedule() }&ensp;{ displayExtensionBtn() }</Status>
        </ItemBoxWrap>
    );
}
export default ItemBox;