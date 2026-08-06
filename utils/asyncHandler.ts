import { NextResponse } from "next/server";
import { ApiError } from "./apiError";

type AsyncHandler<T = NextResponse> = () => Promise<T>;

export const asyncHandler = async <T = NextResponse>(handler: AsyncHandler<T>): Promise<T | NextResponse> => {
    try {
        return await handler();
    } catch (error) {
        console.error(error);

        if (error instanceof ApiError) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.message,
                    errors: error.errors,
                },
                {
                    status: error.statusCode,
                }
            );
        }

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.message,
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
};