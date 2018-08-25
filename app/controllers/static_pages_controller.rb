class StaticPagesController < ApplicationController
  def index
    @neo_price = Rails.cache.fetch('neo_usd', expires_in: 1.hours) do
      data = Coinmarketcap.coin('NEO')
      JSON.parse(data.body)[0]["price_usd"].to_f
    end

    @gas_price = Rails.cache.fetch('gas_usd', expires_in: 1.hours) do
      data = Coinmarketcap.coin('GAS')
      JSON.parse(data.body)[0]["price_usd"].to_f
    end

    @gas_ratio        = (@gas_price / @neo_price) * 100
    @neo_qty          = params[:neo_qty] ? params[:neo_qty].to_f : 100
    @neo_total_value  = @neo_qty * @neo_price
    @gas_qty          = @neo_total_value / @gas_price# How much gas you can get for you NEO right now
  end
end
