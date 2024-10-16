// src/sanitizer/sanitizer.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { DOMPurifyI } from "dompurify";
import { JSDOM } from "jsdom";
import * as DOMPurify from "dompurify"; // Исправлено на import * as
@Injectable()
export class SanitizerInterceptor implements NestInterceptor {
  private purify: DOMPurifyI;
  constructor() {
    const window = new JSDOM("").window;
    this.purify = DOMPurify(window);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Санитизация входящих данных
    if (request.body) {
      request.body = this.sanitizeObject(request.body);
    }

    return next.handle();
  }

  private sanitizeObject(obj: any): any {
    if (typeof obj === "string") {
      return this.purify.sanitize(obj);
    } else if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitizeObject(item));
    } else if (typeof obj === "object" && obj !== null) {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key] = this.sanitizeObject(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  }
}
