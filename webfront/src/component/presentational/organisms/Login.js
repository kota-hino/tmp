import { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

import Loader from '../atoms/Loader';
import Back from '../atoms/Back';
import LoginBox from './LoginBox';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaderComponent: null
        }
    }

    componentDidMount() {
        if(sessionStorage.getItem('accessToken')) {
            //ログイン済み
            console.log('ログインされています');
        } else {
            //ログインされていない
            document.querySelector("body").classList.add('back-on');
            document.querySelector("body").classList.add('login-on');   
        }
    }

    login() {
        // =========================================================================== //
        // login
        // =========================================================================== //

        // 入力内容を取得
        const userName = document.querySelector('#userName').value;
        const pwd = document.querySelector('#pwd').value;

        // バリデーションチェック
        if(userName == "" || pwd == "") {
            alert("ユーザーネームとパスワードを入力してください");
            return;
        }

        // ローダーON
        this.loaderOperation(true);

        // ログイン
        axios
        .post(`http://localhost:3000/api/v1/login?name=${userName}&pwd=${pwd}`)
        .then(response => {

            if(response.data.status == "SUCCESS") {
                sessionStorage.setItem('accessToken', response.data.data.token);
                sessionStorage.setItem('userId', response.data.data.id);
                sessionStorage.setItem('userName', response.data.data.name);

                // リロード
                location.reload();
            } else {
                alert("ログインに失敗しました");
            }

            // ローダーOFF
            this.loaderOperation(false);
        })
        .catch(error => {
            console.log(error);

            // ローダーOFF
            this.loaderOperation(false);
        });
    }

    userCreate() {
        // =========================================================================== //
        // ユーザーを新規作成
        // =========================================================================== //
        
        // 入力内容を取得
        const userName = document.querySelector('#userName').value;
        const pwd = document.querySelector('#pwd').value;
        const nfcData = "";

        // バリデーションチェック
        if(userName == "" || pwd == "") {
            alert("ユーザーネームとパスワードを入力してください");
            return;
        }

        // ローダーON
        this.loaderOperation(true);

        // ユーザー新規作成
        axios
        .post(`http://localhost:3000/api/v1/user?name=${userName}&auth_nfc=${nfcData}&pwd=${pwd}`)
        .then(response => {
            sessionStorage.setItem('accessToken', response.data.data.token);
            sessionStorage.setItem('userId', response.data.data.id);
            sessionStorage.setItem('userName', response.data.data.name);

            alert("アカウントを新規作成しました<br>ログインします");

            // リロード
            location.reload();
        })
        .catch(error => {
            console.log(error);

            // ローダーOFF
            this.loaderOperation(false);
        })
    }

    loaderOperation(status) {
        //ローダーの表示設定
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
                {/* 背景 */}
                <Back />
                {/* 背景 */}

                {/* ログインフォーム */}
                <LoginBox clickedFnLogin={this.login.bind(this)} clickedFnCreate={this.userCreate.bind(this)}/>
                {/* ログインフォーム */}

                {/* ローダー */}
                {this.state.loaderComponent}
                {/* ローダー */}
            </>
        );
    }
}
export default withRouter(Login);