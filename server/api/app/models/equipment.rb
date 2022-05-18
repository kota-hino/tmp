class Equipment < ApplicationRecord
    belongs_to :category
    belongs_to :lab
    has_many :lending_logs
end
