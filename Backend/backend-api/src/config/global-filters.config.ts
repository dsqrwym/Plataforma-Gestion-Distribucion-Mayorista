import { INestApplication } from '@nestjs/common';
import { PrismaExceptionFilter } from '../common/filters/prisma-exception.filter';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

export function useGlobalFilters(app: INestApplication) {
    app.get(PrismaExceptionFilter); // 全局异常过滤器，处理未捕获的异常
    app.get(HttpExceptionFilter); // 全局异常过滤器，处理 HTTP 异常
}
// 这个文件主要用于配置全局异常过滤器。异常过滤器是 NestJS 提供的一种机制，用于处理应用程序中的未捕获异常。通过配置全局异常过滤器，我们可以统一处理所有模块和控制器中的异常，并返回一致的错误响应格式。