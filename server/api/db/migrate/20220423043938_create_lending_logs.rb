class CreateLendingLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :lending_logs do |t|
      t.references :user, foreign_key: true
      t.references :equipment, foreign_key: true
      t.datetime :loan_date, :null => false
      t.datetime :return_schedule, :null => false
      t.datetime :return_schedule_actual

      t.timestamps
    end
  end
end
