class CreateSupersonicPaperPlanes < ActiveRecord::Migration
  def change
    create_table :supersonic_paper_planes do |t|
      t.string :name
      t.integer :score

      t.timestamps null: false
    end
  end
end
