import { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

import Login from "../presentational/organisms/Login";
import SideBar from "../presentational/organisms/SideBar";
import Header from "../presentational/organisms/Header";
import HeadingInfo from "../presentational/atoms/HeadingInfo";
import EquipmentBox from "../presentational/atoms/EquipmentBox";

class LendingItemPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: null,
            imagePath: null,
        }
    }

    componentDidMount() {
        // アクセストーク設定
        axios.defaults.headers.common["Authorization"] = `Token ` + sessionStorage.getItem('accessToken');

        // 貸出情報取得
        axios
        .get("http://localhost:3000/api/v1/lendinglogphoto/" + this.props.match.params.id)
        .then(response => {
            this.setState({
                number: response.data.data.id,
                imagePath: response.data.data.image_url
            });
        })
        .catch(error => console.log(error));
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
                <HeadingInfo text="貸出詳細" />
                {/* ヘッダー表示情報 */}

                {/* 備品詳細ボックス */}
                <EquipmentBox number={this.state.number} contentImgPath={this.state.imagePath} />
                {/* 備品詳細ボックス */}
            </>
        );
    }
}
export default withRouter(LendingItemPage);