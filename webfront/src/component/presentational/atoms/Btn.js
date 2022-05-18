import styled from 'styled-components';

let BtnBox;

const Btn = (props) => {
    const displayBtn = () => {
        if(props.width) {
            BtnBox = styled.button`
                width: ${props.width};
                display: block;
                padding: 5px 40px;
                background-color: #90A2FF;
                border: none;
                border-radius: 5px;
                outline: none;
                color: #FFF;
                font-size: 14px;
                cursor: pointer;
                &:hover {
                    opacity: .8;
                }
            `;
        } else {
            BtnBox = styled.button`
                display: inline-block;
                padding: 5px 40px;
                background-color: #90A2FF;
                border: none;
                border-radius: 5px;
                outline: none;
                color: #FFF;
                font-size: 14px;
                cursor: pointer;
                &:hover {
                    opacity: .8;
                }
            `;
        }

        return <BtnBox onClick={props.clickedFn}>{props.text}</BtnBox>
    }

    return(
        <>
            { displayBtn() }
        </>
    );
}
export default Btn;