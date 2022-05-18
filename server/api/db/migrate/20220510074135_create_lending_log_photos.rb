class CreateLendingLogPhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :lending_log_photos do |t|
      t.references :user, foreign_key: true
      t.datetime :loan_date, :null => false
      t.datetime :return_schedule, :null => false
      t.datetime :return_schedule_actual

      t.timestamps
    end
  end
end
