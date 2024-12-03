"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConn_1 = require("./config/dbConn");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const noteRoute_1 = __importDefault(require("./routes/noteRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/user', userRoute_1.default);
app.use('/user/', noteRoute_1.default);
app.listen(PORT, () => {
    console.log("Listening to port number");
    (0, dbConn_1.dbConn)();
});
app.post('/send-cookie', (req, res) => {
    res.cookie("Name", "Deepak Kumar");
    res.send("Cookie has been set");
});
app.get('/get-cookie', (req, res) => {
    const result = req.cookies.Name;
    res.send(result);
});
app.get('/', (req, res) => {
    res.send("Working and this is home page");
});
