import express from 'express';
import morgan from "morgan";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/api_routes/authRoute.js'
import userRoutes from "./routes/api_routes/userRoutes.js";
import coinRoutes from "./routes/api_routes/coinRoutes.js"
import cors from "cors";
import mainRoutes from "./routes/page_routes/mainRoutes.js";
import bodyParser from 'body-parser';

dotenv.config();
export const app = express();
const PORT = process.env.PORT || 6001;

app.set("view engine", "ejs");
app.set("views" , "views")
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, async () => {
    await connectDb();
    console.log("Listening on port: ", PORT);
})

// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
//     credentials: true,
// }));

// routing for app page
app.use('/main', mainRoutes);

// routing for apis

// ("/register"); -> create an account
// ("/login"); -> login to account 
app.use("/api/auth", authRoutes); 

// ("/profile"); -> display profile details
// ("/profile/logout"); -> logout of account
// ("/profile/current-assets"); -> display account's current assets
app.use("/api/user", userRoutes);

// ("/"); -> list all coins
// ("/search/:id"); -> search specific coin 
// ("/top"); -> list top 7 trending coins
// ("/:id/buy"); -> add coin to current assets
// ("/:id/sell"); -> sell coins from current assets
app.use("/api/coin", coinRoutes);

app.use((req, res) => {
    res.status(404).render("error");
})

export default app;