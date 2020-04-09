import { Controller, Get, Post, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';

import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';

@Controller('photo')
export class PhotoController {
  constructor(private readonly service: PhotoService) {}

  @Get()
  async getPhotoList(): Promise<Photo[]> {
    return this.service.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // FIXME: statusCode: 400 message: "Unexpected field" error: "Bad Request"
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return {
      code: '0',
      msg: 'success',
    };
  }

  @Post('upload/any')
  @UseInterceptors(AnyFilesInterceptor())
  uploadAnyFile(@UploadedFiles() files) {
    console.log(files);
    return {
      code: '0',
      msg: 'success',
    };
  }
}
