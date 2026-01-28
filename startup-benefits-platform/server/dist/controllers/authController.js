"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password, startupName } = req.body;
    try {
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const passwordHash = yield bcryptjs_1.default.hash(password, salt);
        const user = yield User_1.default.create({
            fullName,
            email,
            passwordHash,
            startupName,
        });
        if (user) {
            res.status(201).json({
                success: true,
                data: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    token: generateToken(user._id.toString()),
                },
            });
        }
        else {
            res.status(400).json({ success: false, error: 'Invalid user data' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.passwordHash))) {
            res.json({
                success: true,
                data: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    isVerified: user.isVerified,
                    startUpName: user.startupName,
                    token: generateToken(user._id.toString()),
                },
            });
        }
        else {
            res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});
exports.loginUser = loginUser;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id);
    if (user) {
        res.json({
            success: true,
            data: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                startupName: user.startupName,
                isVerified: user.isVerified,
            },
        });
    }
    else {
        res.status(404).json({ success: false, error: 'User not found' });
    }
});
exports.getMe = getMe;
