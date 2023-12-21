class CreateTextMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :text_messages do |t|
      t.string :phone_number
      t.text :message
      t.string :status
      t.integer :user_id

      t.timestamps
    end
  end
end
