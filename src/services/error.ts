import { HttpException, HttpStatus } from "@nestjs/common"

export const handleError = (error: any) => {
  if(error instanceof Error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
  } else {
    throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST)
  }
}