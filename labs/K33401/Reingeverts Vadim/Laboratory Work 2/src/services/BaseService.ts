import { PrismaClient } from "@prisma/client";

class BaseService {
    protected db = new PrismaClient();
}

export default BaseService;
