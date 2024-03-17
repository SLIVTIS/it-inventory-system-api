import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || "4000",
    db_host: process.env.DB_HOST || "",
    db_name: process.env.DB_NAME || "",
    db_port: process.env.DB_PORT || "",
    db_user: process.env.DB_USER || "",
    db_password: process.env.DB_PASSWORD || "",
    spassword: process.env.SPASSWORD || "genericpassAreas"
};

export default config;