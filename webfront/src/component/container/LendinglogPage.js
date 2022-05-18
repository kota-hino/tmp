import { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

import Loader from "../presentational/atoms/Loader";
import Header from "../presentational/organisms/Header";
import UserSearchForm from "../presentational/organisms/UserSearchForm";
import SubHeading from "../presentational/atoms/SubHeading";
import ItemBox from "../presentational/atoms/ItemBox";

import Login from '../presentational/organisms/Login.js';
import SideBar from "../presentational/organisms/SideBar";

const Flex = styled.div`
    @media screen and (min-width:860px) {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;

        margin: 0 auto;
        max-width: 1260px;
    }
`;

class LendinglogPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemBoxArr: null,
            optionArr: null,
            inputName: null,
            loaderComponent: <Loader />
        }
    }

    componentDidMount() {
        // アクセストーク設定
        axios.defaults.headers.common["Authorization"] = `Token ` + sessionStorage.getItem('accessToken');

        // セレクトボックスのoption情報取得
        this.displaySelectBox();
    }

    getSelectName(e) {
        this.setState({
            inputName: e.target.value
        });
    }
    getLentitem() {
        // =========================================================================== //
        // 貸出中の備品を取得
        // =========================================================================== //

        // ローダーON
        this.loaderOperation(true);

        axios
        .get("http://localhost:3000/api/v1/log/" + this.state.inputName)
        .then(response => {
            console.log(response.data.data);
            this.displayItemBox(response.data.data.equipment, response.data.data.lendingLog, response.data.data.lendingLogPhotos);

            // ローダーOFF
            this.loaderOperation(false);
        })
        .catch(error => {
            console.log(error);

            // ローダーOFF
            this.loaderOperation(false);
        });
    }

    displaySelectBox() {
        // =========================================================================== //
        // selectBoxのoptionを表示する
        // =========================================================================== //

        let optionArrTmp = [];
        axios
        .get("http://localhost:3000/api/v1/user")
        .then(response => {
            console.log(response.data.data);
            response.data.data.forEach(element => {
                optionArrTmp.push(<option value={element.id}>{ element.name }</option>);
            });
            this.setState({
                optionArr: optionArrTmp
            });

            this.loaderOperation(false);
        })
        .catch(error => {
            console.log(error);
            this.loaderOperation(false);
        });
    }

    displayItemBox(equipmentData, lendingLogData, lendingLogPhotoData) {
        // =========================================================================== //
        // itemBoxを表示させる
        // =========================================================================== //

        let Items = [];

        if(equipmentData != "no item" && lendingLogPhotoData != "no item") {
            equipmentData.forEach((element, index) => {
                Items.push(<ItemBox id={element.id} status={element.status} contentTitle={element.name} contentImgPath={element.image_path} clickedFn={this.gotoEquipmentPage.bind(this)} returnSchedule={lendingLogData[index].return_schedule} lendingLog_id={lendingLogData[index].id} extensionFn={this.extension.bind(this)} />)
            });

            lendingLogPhotoData.forEach(element => {
                Items.push(<ItemBox id={element.id} status={2} contentTitle={`貸出記録-${element.loan_date.substr(0, 10)}`} contentImgPath={element.image_url} clickedFn={this.gotoLendingItem.bind(this)} returnSchedule={element.return_schedule} extensionFn={this.extension.bind(this)} lendingLog_id={element.id} />)
            })

            this.setState({
                itemBoxArr: Items
            });
        } else {
            this.setState({
                itemBoxArr: null
            });
        }
    }

    gotoEquipmentPage(e) {
        // =========================================================================== //
        // 備品詳細ページへ
        // =========================================================================== //

        window.location.href = "/equipment/" + e.target.id;
    }

    gotoLendingItem(e) {
        // =========================================================================== //
        // 貸出備品詳細ページへ
        // =========================================================================== //

        window.location.href = "/lendingItemPage/" + e.target.id;
    }

    extension(e) {
        // =========================================================================== //
        // 貸出期間延長
        // =========================================================================== //

        if(window.confirm("貸出期間を14日間延長します。よろしいですか?")) {
            // ローダーON
            this.loaderOperation(true);

            // APIコール処理関数
            this.extensionCallAPI(e);
        }
    }
    extensionCallAPI(e) {
        // =========================================================================== //
        // 延長処理APIコール
        // =========================================================================== //

        // lendinglogIdかlendingLogPhotoIdの判定のため文字列取得
        let tmp = e.target.id.split('-');

        if(tmp[0] == "lendinglogId") {
            const id = Number(tmp[1]);
            axios
            .put("http://localhost:3000/api/v1/lendinglog/extension/" + id)
            .then(response => {
                console.log(response.data);
                if(response.data.status == "SUCCESS") {
                    alert("貸出期間を延長しました");

                    // リロード
                    window.location.reload();
                } else {
                    alert("エラーが発生しました");

                    // ローダーOFF
                    this.loaderOperation(false);
                }
            })
            .catch(error => {
                console.log(error);

                // ローダーOFF
                this.loaderOperation(false);
            });
        } else if(tmp[0] == "lendingLogPhotoId") {
            const id = Number(tmp[1]);
            axios
            .put("http://localhost:3000/api/v1/lendinglogphoto/extension/" + id)
            .then(response => {
                console.log(response.data);
                if(response.data.status == "SUCCESS") {
                    alert("貸出期間を延長しました");

                    // リロード
                    window.location.reload();
                } else {
                    alert("エラーが発生しました");

                    // ローダーOFF
                    this.loaderOperation(false);
                }
            })
            .catch(error => {
                console.log(error);

                // ローダーOFF
                this.loaderOperation(false);
            });
        } else {
            // ローダーOFF
            this.loaderOperation(false);
        }
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

                {/* 検索フォーム */}
                <UserSearchForm optionArr={this.state.optionArr} getSelectName={this.getSelectName.bind(this)} clickedFn={this.getLentitem.bind(this)} />
                {/* 検索フォーム */}

                {/* サブタイトル */}
                <SubHeading text="貸出中の備品" />
                {/* サブタイトル */}

                <Flex>
                    {/* 備品ボックスを表示 */}
                    { this.state.itemBoxArr }
                    {/* 備品ボックスを表示 */}
                </Flex>

                {/* ローダー */}
                {this.state.loaderComponent}
                {/* ローダー */}
            </>
        );
    }
}
export default withRouter(LendinglogPage);