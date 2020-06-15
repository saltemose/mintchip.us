class Api::StocksOwnedController < ApplicationController

    def index 
        @stocks_owned = StockOwned.all
    end

end
