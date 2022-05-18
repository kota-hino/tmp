import { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

import Loader from "../presentational/atoms/Loader";
import Header from "../presentational/organisms/Header";
import SideBar from "../presentational/organisms/SideBar";
import HeadingInfo from "../presentational/atoms/HeadingInfo";
import SubHeading from "../presentational/atoms/SubHeading";
import EquipmentBox from "../presentational/atoms/EquipmentBox";
import Login from '../presentational/organisms/Login.js';

class EquipmentPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            equipmentBoxSt: null,
            subHeadingSt: null,
            loaderComponent: <Loader />
        }
    }

    async componentDidMount() {
        // アクセストーク設定
        axios.defaults.headers.common["Authorization"] = `Token ` + sessionStorage.getItem('accessToken');

        let equipmentData;
        let cateData;

        // 備品情報を取得
        await axios.get("http://localhost:3000/api/v1/equipment/" + this.props.match.params.id)
        .then(response => {
            console.log(response.data.data);

            // サブタイトル表示
            this.displaySubHeading(response.data.data.name);

            equipmentData = response.data.data;
        })
        .catch(error => console.log(error));

        // 研究室情報を取得
        await axios.get("http://localhost:3000/api/v1/lab")
        .then(response => {
            console.log(response.data.data);
            response.data.data.forEach(element => {
                if(element.id == equipmentData.lab_id) {
                    cateData = element.name;
                }
            });
        })
        .catch(error => console.log(error));

        // 備品詳細情報を表示
        this.displayEquipmentBox(equipmentData, cateData);

        // ローダーOFF
        this.loaderOperation(false);
    }

    displayEquipmentBox(equipmentData, labName) {
        this.setState({
            equipmentBoxSt: <EquipmentBox  number={equipmentData.isbn} contentImgPath={equipmentData.image_path} contentDetail={equipmentData.detail} labName={labName} />
        });
    }
    displaySubHeading(str) {
        this.setState({
            subHeadingSt: <SubHeading text={str} />
        });
    }

    loaderOperation(status) {
        // =========================================================================== //
        // ローダーの表示設定
        // =========================================================================== //

        if(status) {
            this.setState({
                loaderComponent: <Loader />
            });
        } else {
            this.setState({
                loaderComponent: null
            });
        }
    }

    render() {
        return(
            <>
                {/* ログイン処理 */}
                <Login />
                {/* ログイン処理 */}

                {/* サイドバー */}
                <SideBar />
                {/* サイドバー */}

                {/* ヘッダー */}
                <Header />
                {/* ヘッダー */}

                {/* ヘッダー表示情報 */}
                <HeadingInfo text="備品詳細" />
                {/* ヘッダー表示情報 */}
                
                {/* サブタイトル表示 */}
                { this.state.subHeadingSt }
                {/* サブタイトル表示 */}

                {/* 備品詳細ボックス表示 */}
                { this.state.equipmentBoxSt }
                {/* 備品詳細ボックス表示 */}

                {/* ローダー */}
                {this.state.loaderComponent}
                {/* ローダー */}
            </>
        );
    }
}
export default withRouter(EquipmentPage);