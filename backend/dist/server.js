"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConn_1 = __importDefault(require("./config/dbConn"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const cloudinary_route_1 = __importDefault(require("./routes/cloudinary.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const ___dirname = path_1.default.resolve();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // replace with your client URL
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/user', user_route_1.default);
app.use('/cloud', cloudinary_route_1.default);
app.use(express_1.default.static(path_1.default.join(___dirname, '../frontend/build')));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(___dirname, "frontend", "build", "index.html"));
});
app.listen(PORT, () => {
    console.log("Listening to poort no", PORT);
    (0, dbConn_1.default)();
});
exports.default = app;
