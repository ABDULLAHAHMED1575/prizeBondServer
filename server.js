const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/check-bonds', (req, res) => {
    try {
        const { userBonds, prizeNumbers } = req.body;
        
        const formattedUserBonds = userBonds.map(bond => bond.padStart(6, '0'));
        const formattedPrizeNumbers = prizeNumbers.map(num => num.padStart(6, '0'));
        
        const matches = formattedUserBonds.filter(bond => 
            formattedPrizeNumbers.includes(bond)
        );
        
        res.json({
            success: true,
            matches,
            totalChecked: userBonds.length,
            totalMatches: matches.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));