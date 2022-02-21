class AddJwtToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :jwt, :string
  end
end
