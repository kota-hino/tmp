# README

## ER図

[ /server/api/.dio ] に記載

## pick up API

```
# ログイン
POST api/v1/login?name={ ユーザー名 }&pwd={ パスワード }

# equipmentを新規登録
POST api/v1/equipment?isbn={ isbn番号 }&category_id={ カテゴリーID }&lab_id={ 研究室ID }&status={ 備品の状態 0 or 1 or 2 }

# 貸し出し登録(書籍)
POST api/v1/lendinglog?user_id={ ユーザーID }&isbn={ isbn番号 }

# 返却登録(書籍)
PUT api/v1/lendinglog/{ isbn番号 }

# 貸出期間の延長(書籍)
PUT api/v1/lendinglog/extension/{ lendinglog_id }

# 貸し出し登録(書籍以外)
POST api/v1/lendinglogphoto?user_id={ ユーザーID } //image={ 画像ファイル }(bodyに入れる)

# 返却登録(書籍以外)
PUT api/v1/lendinglogphoto/{ ユーザーID }

# 貸出期間を延長(書籍以外)
PUT api/v1/lendinglogphoto/extension/{ lendinglogphoto_id }
```
これらAPIの詳細やその他APIについては、以下に記載する。

## API設計詳細

#### login関連
```
# ログイン
POST api/v1/login?name={ ユーザー名 }&pwd={ パスワード }
```
###### 補足
- ログイン について<br>
認証が成功すると、アクセストークンがレスポンスされる。<br>
以降はそのアクセストークンを使用することで、認証が必要なAPIをコールすることができる。<br>
ログイン、ユーザーを作成、以外の全てのAPIで認証を必要とする。

#### user関連
```
# user一覧(id, nameのみ)を表示
GET api/v1/user

# userを新規登録
POST api/v1/user?name={ ユーザー名 }&auth_nfc={ nfcの認証データ }&pwd={ パスワード }
```
###### 補足
- userを新規登録 について<br>
userを追加すると、認証用のトークンが自動生成され、データベースに追加される。

#### lab(研究室)関連
```
# lab一覧を表示
GET api/v1/lab

# labを新規一覧
POST api/v1/lab?name={ 研究室名 }
```

#### category(カテゴリー)関連
```
# category一覧を表示
GET api/v1/category

# categoryを新規一覧
POST /api/v1/category?name={ カテゴリー名 }
```

#### equipment(備品)関連
```
# equipment一覧を表示
GET api/v1/equipment

# equipmentを新規登録
POST api/v1/equipment?isbn={ isbn番号 }&category_id={ カテゴリーID }&lab_id={ 研究室ID }&status={ 備品の状態 0 or 1 or 2 }

# equipmentを個別取得
GET api/v1/equipment/{ equipment_id }

# equipmentを更新
PUT api/v1/equipment/{ equipment_id }

# equipmentを検索
GET api/v1/equipment/searchitem?categoryName={ カテゴリー名を入力 }&equipmentName={ 備品名(あいまい検索可能) }
```
###### 補足
- equipmentを新規登録 について<br>
リクエストを送信すると書籍の場合はサーバーでISBN番号から自動で書籍情報が取得され、保存される。<br>
status={ 備品の状態 0 or 1 or 2 }パラメータでは、その備品の状態を指定する<br>
0 = 貸出可能 | 1 = 貸出不可 | 2 = 貸出中<br>
ISBN番号で情報を取得できなかった場合、"Can't search with isbn"とレスポンスを送信する。<br>
主に書籍以外がこの場合に当たる。<br>
その場合、isbn={ isbn番号 }&category_id={ カテゴリーID }&lab_id={ 研究室ID }&status={ 備品の状態 0 or 1 or 2 }に加えて、最低でもname={ 備品名 }をパラメータに付与することで登録可能<br>
その他パラメータも付与できる。以下に例を記載する<br>
```
# 例
http://localhost:3000/api/v1/equipment?isbn={ isbn番号 }&category_id={ カテゴリーID }&lab_id={ 研究室ID }&status={ 備品の状態 0 or 1 or 2 }&name={ 備品名 }&detail={ 備品詳細 }&image_path={ 画像パス }
```

- equipmentを検索 について<br>
categoryName={ カテゴリー名を入力 }&equipmentName={ 備品名(あいまい検索可能) }<br>
カテゴリー名と備品名は必ずどちらか一方で検索を実行する必要がある。<br>
使用しない検索方法については、値に"none"を入力する。<br>
```
# 例
http://localhost:3000/api/v1/equipment/searchitem?categoryName=書籍&equipmentName=none
```

#### lendinglog(書籍の貸し出し記録)関連
```
# lendinglogを全件取得
GET api/v1/lendinglog

# lendinglogを作成(貸し出し登録)
POST api/v1/lendinglog?user_id={ ユーザーID }&isbn={ isbn番号 }

# lendinglogの実際返却日を更新(返却登録)
PUT api/v1/lendinglog/{ isbn番号 }

# 貸し出し中の備品一覧を表示
GET api/v1/lendinglog/lentitem

# ユーザーごとの貸し出し中の備品一覧を表示
GET api/v1/lendinglog/{ ユーザーID }

# 貸出期間の延長(認証必須)
PUT api/v1/lendinglog/extension/{ lendinglog_id }
```
###### 補足
- lendinglogを作成(貸し出し登録) について<br>
返却予定日は自動で2週間後として登録される。<br>
貸出期間の延長から延長することが可能。

- 貸出期間の延長 について<br>
1回のAPIコールにつき、2週間延長することができる。<br>
2週間以上延長したい場合は、複数回APIをコールすることで実現できる。


#### lendinglogphoto(書籍以外の貸し出し記録)関連
```
# lendinglogphotoを全件取得
GET api/v1/lendinglogphoto

# lendinglogphotoを指定idの一件だけ取得
GET api/v1/lendinglogphoto/{ lendinglogphoto_id }

# lendinglogphotoを作成(貸し出し登録)
POST api/v1/lendinglogphoto?user_id={ ユーザーID } //image={ 画像ファイル }(bodyに入れる)

# lendinglogphotoの実際返却日を更新(返却登録)
PUT api/v1/lendinglogphoto/{ ユーザーID }

# 貸出期間を延長
PUT api/v1/lendinglogphoto/extension/{ lendinglogphoto_id }
```


#### log(総合的貸し出し記録操作)関連
```
# lendinglog, lendinglogphoto同時に全件取得
GET api/v1/log

# lendinglog, lendinglogphoto同時に貸出中の備品を取得
GET api/v1/log/lentitem

# lendinglog, lendinglogphoto同時にユーザー毎の貸出中の備品を取得
GET api/v1/log/{ ユーザーID }
```