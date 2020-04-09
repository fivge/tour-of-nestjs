import { Controller, Get } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Observable } from 'rxjs';
import { Photo } from './photo.entity';

@Controller('photo')
export class PhotoController {
  constructor(private readonly service: PhotoService) {}

  @Get()
  async getPhotoList(): Promise<Photo[]> {
    return this.service.findAll();
  }
}
