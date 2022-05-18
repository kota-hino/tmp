import { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

import Loader from '../presentational/atoms/Loader';
import Header from './../presentational/organisms/Header';
import SearchForm from '../presentational/organisms/SearchForm';
import SubHeading from '../presentational/atoms/SubHeading';
import ItemBox from '../presentational/atoms/ItemBox';

import Login from '../presentational/organisms/Login.js';
import SideBar from '../presentational/organisms/SideBar';

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

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemBoxArr: null,
            subHeading: <SubHeading text="備品一覧" />,
            searchNameInput: null,
            inputName: null,
            optionArr: null,
            inputCate: null,
            loaderComponent: <Loader />
        }
    }

    async componentDidMount() {
        // アクセストーク設定
        axios.defaults.headers.common["Authorization"] = `Token ` + sessionStorage.getItem('accessToken');
        
        // 備品一覧を取得処理
        await axios
        .get("http://localhost:3000/api/v1/equipment")
        .then(response => {
            console.log(response.data.data);

            // 備品表示ボックスを表示
            this.displayItemBox(response.data.data);
        })
        .catch(error => console.log(error));

        // セレクトボックスのoption取得処理
        this.displaySelectBox();

        // ローダーOFF
        this.loaderOperation(false);
    }

    getInputName(e) {
        this.setState({
            inputName: e.target.value
        });
    }
    searchName() {
        // =========================================================================== //
        // 名前検索
        // =========================================================================== //

        // ローダーON
        this.loaderOperation(true);

        // 入力済みnameを取得
        const name = this.state.inputName;

        // 名前検索APIをコール
        axios
        .get("http://localhost:3000/api/v1/equipment/searchitem", {
            params: {
                categoryName: "none",
                equipmentName: name
            }
        })
        .then(response => {
            console.log(response.data.data);

            // サブタイトルを設定
            this.displaySubHeading("検索 : " + name);

            // 備品表示ボックスを表示
            this.displayItemBox(response.data.data);

            // ローダーOFF
            this.loaderOperation(false);
        })
        .catch(error => {
            console.log(error);

            // ローダーOFF
            this.loaderOperation(false);
        });
    }
    getSelectCate(e) {
        this.setState({
            inputCate: e.target.value
        });
    }
    searchCategory() {
        // =========================================================================== //
        // カテゴリー検索
        // =========================================================================== //

        // ローダーON
        this.loaderOperation(true);
        
        // 選択済みカテゴリーを取得
        const cate = this.state.inputCate;

        // カテゴリー検索APIコール
        axios
        .get("http://localhost:3000/api/v1/equipment/searchitem", {
            params: {
                categoryName: cate,
                equipmentName: "none"
            }
        })
        .then(response => {
            console.log(response.data.data);

            // サブタイトルを設定
            this.displaySubHeading("検索 : " + cate);

            // 備品表示ボックスを表示
            this.displayItemBox(response.data.data);

            // ローダーOFF
            this.loaderOperation(false);
        })
        .catch(error => {
            console.log(error);

            // ローダーOFF
            this.loaderOperation(false);
        });
    }
    searchBtn() {
        // 検索ボタン動作制御
        if(this.state.inputCate == null || this.state.inputCate == "") {
            this.searchName();
        } else if(this.state.inputName == null || this.state.inputName == "") {
            this.searchCategory();
        } else if(this.state.inputCate == null || this.state.inputCate == null) {
            this.searchName();
        } else {
            this.searchCategory();
        }
    }

    displayItemBox(data) {
        // =========================================================================== //
        // itemBoxを表示させる
        // =========================================================================== //

        let Items = [];

        if(data != "no item") {
            data.forEach(element => {
                Items.push(<ItemBox id={element.id} status={element.status} contentTitle={element.name} contentImgPath={element.image_path} clickedFn={this.gotoEquipmentPage.bind(this)} />)
            });

            this.setState({
                itemBoxArr: Items
            });
        } else {
            this.setState({
                itemBoxArr: null
            });
        }

    }
    displaySubHeading(str) {
        // =========================================================================== //
        // subHeadingを表示させる
        // =========================================================================== //

        this.setState({
            subHeading: <SubHeading text={str} />
        });
    }
    async displaySelectBox() {
        // =========================================================================== //
        // selectBoxのoptionを表示する
        // =========================================================================== //

        let optionArrTmp = [];
        await axios
        .get("http://localhost:3000/api/v1/category")
        .then(response => {
            console.log(response.data.data);
            response.data.data.forEach(element => {
                optionArrTmp.push(<option value={element.name}>{ element.name }</option>);
            });
            this.setState({
                optionArr: optionArrTmp
            });
        })
        .catch(error => console.log(error));
    }

    gotoEquipmentPage(e) {
        window.location.href = "/equipment/" + e.target.id;
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
                <SearchForm clickedFn={this.searchBtn.bind(this)} getInputName={this.getInputName.bind(this)} optionArr={this.state.optionArr} getSelectCate={this.getSelectCate.bind(this)} />
                {/* 検索フォーム */}
                
                {/* サブタイトルを表示 */}
                { this.state.subHeading }
                {/* サブタイトルを表示 */}

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
export default withRouter(MainPage);