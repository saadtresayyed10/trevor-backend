// src\server.ts

import { env } from "./config/env.config";
import app from "./config/app.config";
import userRoutes from "./api/routes/user.route";
import taskRoutes from "./api/routes/task.route";

const PORT = env.port || 8000;

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
