import { env } from "./config/env.config";
import app from "./config/app.config";
import userRoutes from "./api/routes/user.route";

const PORT = env.port;

app.use("/api", userRoutes);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
