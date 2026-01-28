"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
// Connect to Database
(0, db_1.default)();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Startup Benefits API is running...');
});
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dealRoutes_1 = __importDefault(require("./routes/dealRoutes"));
const claimRoutes_1 = __importDefault(require("./routes/claimRoutes"));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/deals', dealRoutes_1.default);
app.use('/api/claims', claimRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
