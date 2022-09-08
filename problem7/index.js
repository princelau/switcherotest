const SQL_QUERY = `
SELECT balances.*
FROM ( 
	SELECT address, SUM(
	CASE 
	        WHEN denom='usdc' THEN 0.000001 * amount
		WHEN denom='swth' THEN 0.00000005 * amount
		WHEN denom='tmz' THEN 0.003 * amount
		ELSE false END
	) AS totalBalance
	FROM balances
	WHERE address 
		IN (SELECT address 
	 		FROM trades 
	 		WHERE block_height > 730000) 
	GROUP BY address
) AS balances
WHERE balances.totalBalance >= 500`;

// in a real inplementation, we will replace recent block_height, prices of denoms and minimum balance to be variables
const min_wallet_balance = 500;
const recent_block_height = 730000;
const usdc_rate = 0.000001;
const swth_rate = 0.00000005;
const tmz_rate = 0.003;

const SQL_QUERY_DYNAMIC = `
SELECT balances.*
FROM ( 
	SELECT address, SUM(
	CASE 
	        WHEN denom='usdc' THEN :usdc_rate * amount
		WHEN denom='swth' THEN :swth_rate * amount
		WHEN denom='tmz' THEN :tmz_rate * amount
		ELSE false END
	) AS totalBalance
	FROM balances
	WHERE address 
		IN (SELECT address 
	 		FROM trades 
	 		WHERE block_height > :recent_block_height) 
	GROUP BY address
) AS balances
WHERE balances.totalBalance >= :min_wallet_balance`;
