# status : 0 = 貸出可能(研究室にある) 1 = 貸出不可(研究室にある) 2 = 貸出中

class CreateEquipment < ActiveRecord::Migration[5.2]
  def change
    create_table :equipment do |t|
      t.string :name, :null => false
      t.references :category, foreign_key: true
      t.string :image_path
      t.integer :status, :null => false
      t.string :isbn, :null => false
      t.text :detail
      t.references :lab, foreign_key: true

      t.timestamps
    end
  end
end
