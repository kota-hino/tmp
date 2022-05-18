import { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

import Loader from "../presentational/atoms/Loader.js";
import Login from '../presentational/organisms/Login.js';
import SideBar from "../presentational/organisms/SideBar";
import Header from "../presentational/organisms/Header";
import UserInfo from "../presentational/atoms/UserInfo";
import LendingBox from "../presentational/organisms/LendingBox";
import ReturnBox from "../presentational/organisms/ReturnBox";
import LendingBoxBook from "../presentational/organisms/LendingBoxBook.js";
import ReturnBoxBook from "../presentational/organisms/ReturningBoxBook.js";

const Wrap = styled.div`
    margin: 0 auto;
    padding: 15px;
    max-width: 860px;
`;

const MarginS = styled.div`
    margin: 15px;
`;

const Img = styled.img`
    width: 50%;
`;
const LendingPhotoId = styled.h3`
    width: 50%;
    font-size: 15px;
`;

class LendingreturningPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userName: null,
            returnOptionArr: null,
            selectLendingId: null,
            lendingPhotoArr: null,
            loaderComponent: <Loader />
        }
    }

    componentDidMount() {
        // アクセストーク設定
        axios.defaults.headers.common["Authorization"] = `Token ` + sessionStorage.getItem('accessToken');
        
        // ユーザー情報を取得
        this.setUserInfo();

        // 画像貸出情報を取得
        this.getLendinglogphotoInfo();
    }

    setUserInfo() {
        // =========================================================================== //
        // ユーザー情報を取得
        // =========================================================================== //

        this.setState({
            userId: sessionStorage.getItem('userId'),
            userName: sessionStorage.getItem('userName')
        });
    }

    getLendinglogphotoInfo() {
        // =========================================================================== //
        // 画像貸出情報を取得
        // =========================================================================== //

        // 画像貸出情報を取得(ユーザーごと)API
        axios
        .get("http://localhost:3000/api/v1/lendinglogphoto/lentitem/" + sessionStorage.getItem('userId'))
        .then(response => {
            console.log(response.data.data);
            let tmp = [];
            let tmpLendingPhoto = [];
            response.data.data.forEach(element => {
                tmp.push(<option value={element.id} >{ element.id }</option>);
                tmpLendingPhoto.push(<Img src={ element.image_url } />);
                tmpLendingPhoto.push(<LendingPhotoId>貸出記録ID-{ element.id }</LendingPhotoId>);
            });

            this.setState({
                returnOptionArr: tmp,
                lendingPhotoArr: tmpLendingPhoto
            });

            // ローダーOFF
            this.loaderOperation(false);
        })
        .catch(error => {
            console.log(error);

            // ローダーOFF
            this.loaderOperation(false);
        });
    }

    lending() {
        // =========================================================================== //
        // 書籍以外の貸出処理
        // =========================================================================== //

        // バリデーションチェック
        if(Number(document.querySelector("#lendingFile").files.length) != 1) {
            alert("画像ファイルが正しくありません");
            return;
        }

        // ローダーON
        this.loaderOperation(true);
        
        // 送信ファイルを生成
        const data = new FormData();
        const file = document.querySelector("#lendingFile").files[0];
        data.append('image', file);

        // 書籍以外の貸出処理API
        axios
        .post("http://localhost:3000/api/v1/lendinglogphoto", data, {
            params: {
                user_id: sessionStorage.getItem('userId')
            }
        })
        .then(response => {
            console.log(response);
            if(response.data.status == "SUCCESS") {
                alert("貸出が完了しました");

                // ローダーON
                location.reload();
            } else {
                alert("貸出を完了できませんでした");

                // ローダーOFF
                this.loaderOperation(false);
            }
        })
        .catch(error => {
            console.log(error);

            // ローダーOFF
            this.loaderOperation(false);
        });
    }

    getSelectId(e) {
        this.setState({
            selectLendingId: e.target.value
        });
    }
    returning() {
        // =========================================================================== //
        // 書籍以外の返却処理
        // =========================================================================== //

        // バリデーションチェック
        if(Number(document.querySelector("#returnFile").files.length) != 1 || Number(this.state.selectLendingId) == 0) {
            alert("画像ファイルが正しくないか、貸出記録IDが選択されていません");
            return;
        }
        
        // ローダーON
        this.loaderOperation(true);

        // 送信ファイルを生成
        const data = new FormData();
        const file = document.querySelector("#returnFile").files[0];
        data.append('image', file);
        
        // 書籍以外の返却処理API
        axios
        .post(`http://localhost:3000/api/v1/lendinglogphoto/${this.state.selectLendingId}`, data)
        .then(response => {
            console.log(response);
            if(response.data.status == "SUCCESS") {
                alert("返却が完了しました");

                // リロード
                location.reload();
            } else {
                alert("返却を完了できませんでした");

                // ローダーOFF
                this.loaderOperation(false);
            }
        })
        .catch(error => {
            console.log(error);

            // ローダーOFF
            this.loaderOperation(false);
        });
    }

    lendingBook() {
        // =========================================================================== //
        // 書籍貸出処理
        // =========================================================================== //

        // isbn番号を取得
        const isbn = Number(document.querySelector("#lendingFileBook").value);
        // バリデーションチェック
        if(isbn == "") {
            alert("isbn番号を入力してください");
            return;
        }

        // ローダーON
        this.loaderOperation(true);
        
        // 貸出処理API
        axios
        .post(`http://localhost:3000/api/v1/lendinglog?user_id=${sessionStorage.getItem('userId')}&isbn=${isbn}`)
        .then(response => {
            console.log(response);
            if(response.data.status == "SUCCESS") {
                alert("貸出が完了しました");

                // リロード
                location.reload();
            } else {
                alert("貸出を完了できませんでした");

                // ローダーOFF
                this.loaderOperation(false);
            }
        })
        .catch(error => {
            console.log(error);
            alert("貸出を完了できませんでした");

            // ローダーOFF
            this.loaderOperation(false);
        });
    }

    returningBook() {
        // =========================================================================== //
        // 書籍返却処理
        // =========================================================================== //

        // isbn番号を取得
        const isbn = Number(document.querySelector("#returnFileBook").value);
        // バリデーションチェック
        if(isbn == "") {
            alert("isbn番号を入力してください");
            return;
        }

        // ローダーON
        this.loaderOperation(true);

        // 返却処理API
        axios
        .put("http://localhost:3000/api/v1/lendinglog/" + isbn)
        .then(response => {
            console.log(response);
            if(response.data.status == "SUCCESS") {
                alert("返却が完了しました");

                // リロード
                location.reload();
            } else {
                alert("返却を完了できませんでした");

                // ローダーOFF
                this.loaderOperation(false);
            }
        })
        .catch(error => {
            console.log(error);
            alert("返却を完了できませんでした");

            // ローダーOFF
            this.loaderOperation(false);
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

                {/* ユーザー情報表示 */}
                <UserInfo userName={this.state.userName} />
                {/* ユーザー情報表示 */}

                <Wrap>
                    {/* 貸出処理(書籍) */}
                    <LendingBoxBook clickedFn={this.lendingBook.bind(this)} />
                    {/* 貸出処理(書籍) */}

                    <MarginS />

                    {/* 返却処理(書籍) */}
                    <ReturnBoxBook clickedFn={this.returningBook.bind(this)} />
                    {/* 返却処理(書籍) */}

                    <MarginS />

                    {/* 貸出処理(その他) */}
                    <LendingBox clickedFn={this.lending.bind(this)} />
                    {/* 貸出処理(その他) */}

                    <MarginS />

                    {/* 返却処理(その他) */}
                    <ReturnBox clickedFn={this.returning.bind(this)} getSelectId={this.getSelectId.bind(this)} optionArr={this.state.returnOptionArr} lendingPhotoArr={this.state.lendingPhotoArr} />
                    {/* 返却処理(その他) */}
                </Wrap>

                {/* ローダー */}
                {this.state.loaderComponent}
                {/* ローダー */}
            </>
        );
    }
}
export default withRouter(LendingreturningPage);