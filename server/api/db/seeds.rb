# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# テストデータuser
User.create!(
    name: '開発者',
    auth_nfc: 'XXXXXXXXXXXXXXX',
    pwd: 'password'
)

# テストデータLab
Lab.create!(
    [
        {
            name: '中川研究室'
        },
        {
            name: '多胡研究室'
        }
    ]
)

# テストデータCategory
Category.create!(
    name: '書籍'
)