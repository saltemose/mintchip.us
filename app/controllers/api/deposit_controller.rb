class Api::DepositController < ApplicationController


    def create 
        @deposit = Deposit.new(deposit_params)
        @deposit.save
    end

 

    def delete
        @deposit = Deposit.find_by(params[:id])
        @deposit.destroy
    end



    private

    def deposit_params
        params.require(:deposit).permit(:amount, :user_id)
    end 
end
