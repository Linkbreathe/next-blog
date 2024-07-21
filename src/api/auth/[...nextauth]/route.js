import {authOptions} from "@/utils/auth"
import NextAuth from "next-auth"

const handler = NextAuth( authOptions )
/**
 * 在 next-auth 中，通常会定义一个处理器来管理用户认证、登录、登出等操作。
 * 通过导出 handler 并使用别名 GET 和 POST，可以方便地在其他模块中引用和使用认证处理器。
 */
export {handler as GET,handler as POST}