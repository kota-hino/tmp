class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name, :null => false
      t.string :auth_nfc, :null => false
      t.string :pwd, :null => false
      t.string :token

      t.timestamps
    end
    add_index :users, :token, unique: true
  end
end
